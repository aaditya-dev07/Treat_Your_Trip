import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../../db/storage';
import ProfileModal from '../ProfileModal';
import { PlaneTakeoff, User, LogOut, Inbox, CheckCircle, XCircle } from 'lucide-react';

const GuideDashboard = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.type !== 'guide') {
      navigate('/auth/guide');
      return;
    }
    setUser(currentUser);
    loadRequests(currentUser.id);

    const interval = setInterval(() => loadRequests(currentUser.id), 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const loadRequests = (userId) => {
    const reqs = StorageService.getRequestsForGuide(userId);
    setRequests(reqs);
  };

  const handleAction = (requestId, status) => {
    try {
      StorageService.updateRequestStatus(requestId, status);
      loadRequests(user.id);
      
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert ${status === 'accepted' ? 'alert-success' : 'alert-info'}`;
      alertDiv.innerHTML = `<span class="flex-center" style="gap:8px">Request ${status}</span>`;
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!user) return null;

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const pastRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      {/* Cinematic Video Background */}
      <div className="video-bg-container" style={{ opacity: 0.2 }}>
        <video autoPlay loop muted playsInline>
          <source src="https://cdn.pixabay.com/video/2023/10/22/185863-876378413_large.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {showProfile && <ProfileModal user={user} onClose={() => setShowProfile(false)} />}

      <nav className="dashboard-nav glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}>
        <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <PlaneTakeoff className="text-accent" size={28} />
          <span style={{ color: 'var(--accent-color)' }}>Treat Your Trips Guide</span>
        </div>
        
        <div className="user-profile-menu">
          <div 
            onClick={() => setShowProfile(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, cursor: 'pointer' }}
          >
            <div style={{ background: 'var(--accent-color)', padding: '6px', borderRadius: '50%', color: 'white' }}>
              <User size={18} />
            </div>
            {user.username}
          </div>
          <button onClick={logout} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px', border: 'none', background: 'transparent' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <div className="main-content">
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--primary-dark)' }}>
          Guide Dashboard
        </h1>

        <div className="grid-container" style={{ gridTemplateColumns: 'minmax(300px, 2fr) minmax(300px, 1fr)' }}>
          {/* Main Content -> Pending Requests */}
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Inbox size={20} className="text-secondary" /> Request Box ({pendingRequests.length})
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingRequests.length === 0 ? (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  You have no pending requests from tourists at the moment.
                </div>
              ) : (
                pendingRequests.map(req => (
                  <div key={req.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{req.touristName}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{req.details}</p>
                      <small style={{ color: 'var(--text-muted)' }}>{new Date(req.createdAt).toLocaleString()}</small>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button 
                        className="btn-success" 
                        onClick={() => handleAction(req.id, 'accepted')}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <CheckCircle size={16} /> Accept
                      </button>
                      <button 
                        className="btn-danger" 
                        onClick={() => handleAction(req.id, 'rejected')}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar -> Past Requests / Stats */}
          <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Recent History</h3>
            <div className="glass-panel" style={{ padding: '1.5rem', background: '#f9fafb', borderColor: '#e5e7eb', boxShadow: 'none' }}>
              {pastRequests.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center' }}>No recent history found.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {pastRequests.slice(0, 5).map(req => (
                    <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{req.touristName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {new Date(req.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        {req.status === 'accepted' ? (
                          <span style={{ color: 'var(--success-color)', fontSize: '0.875rem', fontWeight: 600 }}>Accepted</span>
                        ) : (
                          <span style={{ color: 'var(--error-color)', fontSize: '0.875rem', fontWeight: 600 }}>Rejected</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem', background: 'white' }}>
              <h4 style={{ marginBottom: '1rem' }}>Your Profile</h4>
              <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Country:</span>
                <strong>{user.country}</strong>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Languages:</span>
                <span style={{ textAlign: 'right' }}>
                  {user.languages.map(l => (
                    <span key={l} style={{ display: 'inline-block', background: 'var(--bg-color)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', marginLeft: '4px', marginBottom: '4px' }}>
                      {l}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;

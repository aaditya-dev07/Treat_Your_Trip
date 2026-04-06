import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HireGuide from './HireGuide';
import BookHotel from './BookHotel';
import Packages from './Packages';
import Destinations from './Destinations';
import MyBookings from './MyBookings';
import ProfileModal from '../ProfileModal';
import Chatbot from '../../components/Chatbot';
import { StorageService } from '../../db/storage';
import { PlaneTakeoff, User, LogOut, Bell, BookmarkCheck } from 'lucide-react';

const TouristDashboard = () => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.type !== 'tourist') {
      navigate('/auth/tourist');
      return;
    }
    setUser(currentUser);
    checkNotifications(currentUser.id);

    // Simulated polling for new updates (e.g. guide accepted)
    const interval = setInterval(() => checkNotifications(currentUser.id), 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const checkNotifications = (userId) => {
    const reqs = StorageService.getRequestsForTourist(userId);
    // Count recently changed requests (for demo, just checking accepted/rejected)
    // Normally we'd store a "read" flag. For this demo, we'll alert if status != pending
    let newNotifs = 0;
    const oldReqsStr = localStorage.getItem(`tourist_seen_reqs_${userId}`);
    const oldReqs = JSON.parse(oldReqsStr || '{}');

    reqs.forEach(r => {
      if (r.status !== 'pending' && oldReqs[r.id] !== r.status) {
        newNotifs++;
        alert(`Guide Notification: Your request to ${r.guideName} was ${r.status}!`);
        oldReqs[r.id] = r.status;
      }
    });

    if (newNotifs > 0) {
      localStorage.setItem(`tourist_seen_reqs_${userId}`, JSON.stringify(oldReqs));
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      {/* Cinematic Video Background */}
      <div className="video-bg-container" style={{ opacity: 0.15 }}>
        <video autoPlay loop muted playsInline>
          <source src="https://cdn.pixabay.com/video/2020/05/25/40156-424707204_large.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" style={{ background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(15, 23, 42, 0.8))' }}></div>
      </div>

      <Chatbot />
      
      {showProfile && <ProfileModal user={user} onClose={() => setShowProfile(false)} />}

      <nav className="dashboard-nav glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}>
        <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <PlaneTakeoff className="text-primary" size={28} />
          <span>Treat Your Trips</span>
        </div>
        
        <div className="user-profile-menu">
          <div 
            onClick={() => setActiveTab('bookings')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, cursor: 'pointer', marginRight: '1rem', color: 'var(--accent-color)' }}
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          >
            <BookmarkCheck size={20} /> My Bookings
          </div>
          <div 
            onClick={() => setShowProfile(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, cursor: 'pointer' }}
          >
            <div style={{ background: 'var(--primary-light)', padding: '6px', borderRadius: '50%', color: 'white', transition: 'transform 0.2s', className: 'hover:scale-110' }}>
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
          Welcome back, {user.username}!
        </h1>

        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'destinations' ? 'active' : ''}`}
            onClick={() => setActiveTab('destinations')}
          >
            Destinations
          </button>
          <button 
            className={`tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            Hire a Guide
          </button>
          <button 
            className={`tab-btn ${activeTab === 'hotel' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotel')}
          >
            Book Accommodation
          </button>
          <button 
            className={`tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            Adventure Packages
          </button>
        </div>

        <div>
          {activeTab === 'destinations' && <Destinations />}
          {activeTab === 'guide' && <HireGuide />}
          {activeTab === 'hotel' && <BookHotel />}
          {activeTab === 'packages' && <Packages />}
          {activeTab === 'bookings' && <MyBookings />}
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;

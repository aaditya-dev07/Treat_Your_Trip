import React, { useState, useEffect } from 'react';
import { StorageService } from '../../db/storage';
import { Search, MapPin, Languages, CheckCircle, Clock } from 'lucide-react';

const COUNTRIES = ['', 'Nepal', 'India', 'Switzerland'];
const LANGUAGES = ['', 'English', 'Nepali', 'Hindi', 'French', 'German'];

const HireGuide = () => {
  const [guides, setGuides] = useState([]);
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [requests, setRequests] = useState([]);
  const [alertMsg, setAlertMsg] = useState({ type: '', text: '' });
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    loadGuides();
    loadRequests();
  }, [country, language]);

  const loadGuides = () => {
    const results = StorageService.getGuidesByFilter(country, language);
    setGuides(results);
  };

  const loadRequests = () => {
    const reqs = StorageService.getRequestsForTourist(currentUser.id);
    setRequests(reqs);
  };

  const handleRequest = (guideId) => {
    try {
      StorageService.createRequest(currentUser.id, guideId, `Booking request from ${currentUser.username}`);
      loadRequests();
      setAlertMsg({ type: 'success', text: '⏳ Request Pending — Your hire request has been sent to the guide. It will be confirmed once the guide approves it.' });
    } catch (e) {
      setAlertMsg({ type: 'error', text: e.message });
    }
    setTimeout(() => setAlertMsg({ type: '', text: '' }), 4000);
  };

  return (
    <div className="animate-fade-in">
      {alertMsg.text && (
        <div className={`alert ${alertMsg.type === 'error' ? 'alert-error' : 'alert-success'}`} style={{ backgroundColor: alertMsg.type === 'error' ? '#fee2e2' : undefined, color: alertMsg.type === 'error' ? '#ef4444' : undefined }}>
          {alertMsg.text}
        </div>
      )}
      <div className="filters-bar">
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label className="form-label" style={{ marginBottom: '4px' }}>Destination</label>
          <select className="input-field" value={country} onChange={e => setCountry(e.target.value)}>
            <option value="">Any Destination</option>
            {COUNTRIES.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label className="form-label" style={{ marginBottom: '4px' }}>Language</label>
          <select className="input-field" value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="">Any Language</option>
            {LANGUAGES.filter(Boolean).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Search size={20} className="text-primary" /> Available Guides
      </h3>

      <div className="grid-container">
        {guides.map(guide => {
          const existingReq = requests.find(r => r.guideId === guide.id);
          
          return (
            <div key={guide.id} className="item-card glass-panel" style={{ background: 'white' }}>
              <div className="item-card-image-wrap" style={{ height: '150px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', color: 'white' }}>{guide.username.charAt(0).toUpperCase()}</span>
                <div className="item-badge">{guide.country}</div>
              </div>
              <div className="item-card-content">
                <h4 className="item-card-title">{guide.username}</h4>
                <div className="item-card-subtitle">
                  <Languages size={16} /> 
                  <span>{guide.languages.join(', ')}</span>
                </div>
                
                <div className="item-card-footer">
                  {existingReq ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', 
                      color: existingReq.status === 'accepted' ? 'var(--success-color)' : 
                             existingReq.status === 'rejected' ? 'var(--error-color)' : 'var(--accent-color)',
                      fontWeight: 600 }}>
                      {existingReq.status === 'accepted' && <CheckCircle size={18} />}
                      {existingReq.status === 'pending' && <Clock size={18} />}
                      {existingReq.status === 'accepted' ? 'Booking Confirmed ✅' : 
                       existingReq.status === 'pending' ? 'Request Pending ⏳' :
                       existingReq.status === 'rejected' ? 'Rejected ❌' : existingReq.status}
                    </span>
                  ) : (
                    <button 
                      className="btn-primary" 
                      onClick={() => handleRequest(guide.id)}
                      style={{ width: '100%' }}
                    >
                      Hire Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {guides.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
            No experts found matching your criteria. Try adjusting the filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default HireGuide;

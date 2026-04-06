import React, { useState, useEffect } from 'react';
import { StorageService } from '../../db/storage';
import { Activity, Map } from 'lucide-react';

const COUNTRIES = ['', 'Nepal', 'India', 'Switzerland'];

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [alertMsg, setAlertMsg] = useState({ type: '', text: '' });
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    loadPackages();
  }, [countryFilter]);

  const loadPackages = () => {
    setPackages(StorageService.getPackages({ country: countryFilter }));
  };

  const handleBook = (packageId) => {
    try {
      StorageService.bookItem(currentUser.id, packageId, 'package');
      setAlertMsg({ type: 'success', text: 'Package booked successfully! Check My Bookings.' });
    } catch (e) {
      setAlertMsg({ type: 'error', text: e.message });
    }
    setTimeout(() => setAlertMsg({ type: '', text: '' }), 4000);
  };

  return (
    <div className="animate-fade-in">
      {alertMsg.text && (
        <div className={`alert ${alertMsg.type === 'error' ? 'alert-error' : 'alert-success'}`} style={{ backgroundColor: alertMsg.type === 'error' ? '#fee2e2' : undefined, color: alertMsg.type === 'error' ? '#ef4444' : undefined, marginBottom: '1rem' }}>
          {alertMsg.text}
        </div>
      )}
      <div className="hero-section">
        <img src="https://images.unsplash.com/photo-1513311068348-19c8fbdc0bb6?auto=format&fit=crop&q=80&w=1200" alt="Adventure" className="hero-image" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 className="hero-title">Discover Thrilling Adventures</h2>
          <p className="hero-subtitle">Rafting, Cycling, Trekking and more.</p>
        </div>
      </div>

      <div className="filters-bar" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Map size={24} className="text-primary" />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <select 
            className="input-field" 
            value={countryFilter} 
            onChange={e => setCountryFilter(e.target.value)}
          >
            <option value="">All Destinations</option>
            {COUNTRIES.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid-container">
        {packages.map(pkg => (
          <div key={pkg.id} className="flashcard-container">
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div style={{ position: 'relative', height: '100%' }}>
                  <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent-color)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {pkg.activity}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '1.5rem', color: 'white', textAlign: 'left' }}>
                    <h4 style={{ fontSize: '1.25rem', color: 'white', marginBottom: 0 }}>{pkg.title}</h4>
                  </div>
                </div>
              </div>
              <div className="flashcard-back" style={{ textAlign: 'center' }}>
                <Activity size={32} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '1rem' }}>{pkg.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  {pkg.desc}
                </p>
                <button className="btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent-color), #ff9800)', width: '100%' }} onClick={(e) => { e.stopPropagation(); handleBook(pkg.id); }}>
                  Book Package
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;

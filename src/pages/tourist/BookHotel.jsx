import React, { useState, useEffect } from 'react';
import { StorageService } from '../../db/storage';
import { MapPin, Star } from 'lucide-react';

const BookHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [alertMsg, setAlertMsg] = useState({ type: '', text: '' });
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const COUNTRIES = ['', 'Nepal', 'India', 'Switzerland'];
  const CITIES = {
    'Nepal': ['Pokhara', 'Kathmandu', 'Namche Bazaar'],
    'India': ['Mumbai', 'New Delhi', 'Jodhpur'],
    'Switzerland': ['Zurich', 'Geneva', 'Zermatt']
  };

  useEffect(() => {
    loadHotels();
  }, [countryFilter, cityFilter]);

  const loadHotels = () => {
    setHotels(StorageService.getHotels({ country: countryFilter, city: cityFilter }));
  };

  const handleBook = (hotelId) => {
    try {
      StorageService.bookItem(currentUser.id, hotelId, 'hotel');
      setAlertMsg({ type: 'success', text: 'Hotel booked successfully! Manage it in My Bookings.' });
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
      <div className="filters-bar">
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label className="form-label" style={{ marginBottom: '4px' }}>Country</label>
          <select 
            className="input-field" 
            value={countryFilter} 
            onChange={e => {
              setCountryFilter(e.target.value);
              setCityFilter('');
            }}
          >
            <option value="">All Countries</option>
            {COUNTRIES.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label className="form-label" style={{ marginBottom: '4px' }}>City</label>
          <select 
            className="input-field" 
            value={cityFilter} 
            onChange={e => setCityFilter(e.target.value)}
            disabled={!countryFilter}
          >
            <option value="">All Cities</option>
            {countryFilter && CITIES[countryFilter].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid-container">
        {hotels.map(hotel => (
          <div key={hotel.id} className="flashcard-container">
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div style={{ position: 'relative', height: '100%' }}>
                  <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '1.5rem', color: 'white', textAlign: 'left' }}>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'white' }}>{hotel.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: '#ffd700' }}>
                      <Star size={16} fill="#ffd700" color="#ffd700" /> {hotel.rating}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flashcard-back">
                <MapPin size={32} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '0.5rem' }}>{hotel.city}, {hotel.country}</h4>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-color)', marginBottom: '1.5rem' }}>
                  ${hotel.price} <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>/ night</span>
                </div>
                <button className="btn-primary" style={{ background: 'white', color: 'var(--primary-dark)', width: '100%' }} onClick={(e) => { e.stopPropagation(); handleBook(hotel.id); }}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookHotel;

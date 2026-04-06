import React, { useState, useEffect } from 'react';
import { StorageService } from '../../db/storage';
import { Trash2, Hotel, Activity, UserCircle } from 'lucide-react';

const MyBookings = () => {
  const [user, setUser] = useState(null);
  const [hotelBooking, setHotelBooking] = useState(null);
  const [packageBooking, setPackageBooking] = useState(null);
  const [guideRequest, setGuideRequest] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');

  const loadData = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    setUser(currentUser);

    const bookings = StorageService.getActiveBookings(currentUser.id) || [];
    const hotels = StorageService.getHotels({}) || [];
    const packages = StorageService.getPackages({}) || [];
    
    const hb = bookings.find(b => b.type === 'hotel');
    if (hb) {
      const hotelDetails = hotels.find(h => h.id === hb.itemId);
      setHotelBooking(hotelDetails ? { ...hotelDetails, ...hb, hotelId: hotelDetails.id } : null);
    } else {
      setHotelBooking(null);
    }

    const pb = bookings.find(b => b.type === 'package');
    if (pb) {
      const packageDetails = packages.find(p => p.id === pb.itemId);
      setPackageBooking(packageDetails ? { ...packageDetails, ...pb, packageId: packageDetails.id } : null);
    } else {
      setPackageBooking(null);
    }

    const requests = StorageService.getRequestsForTourist(currentUser.id) || [];
    const activeReq = requests.find(r => r.status === 'pending' || r.status === 'accepted');
    setGuideRequest(activeReq || null);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCancelBooking = (bookingId) => {
    try {
      StorageService.deleteBooking(bookingId);
      loadData();
      showAlert('Booking cancelled successfully.');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancelGuide = (requestId) => {
    try {
      StorageService.deleteRequest(requestId);
      loadData();
      showAlert('Guide request cancelled successfully.');
    } catch (err) {
      alert(err.message);
    }
  };

  const showAlert = (msg) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(''), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {alertMsg && <div className="alert alert-success">{alertMsg}</div>}
      
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>My Bookings</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage your active reservations. You may hold 1 of each type at a time.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Hotel Booking */}
        <div className="glass-panel physics-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '50%', color: 'white' }}>
              <Hotel size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary-dark)' }}>Accommodation</h3>
              {hotelBooking ? (
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>{hotelBooking.name} in {hotelBooking.city}</p>
              ) : (
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>No active hotel bookings.</p>
              )}
            </div>
          </div>
          {hotelBooking && (
            <button 
              onClick={() => handleCancelBooking(hotelBooking.id)}
              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
            >
              <Trash2 size={16} /> Cancel
            </button>
          )}
        </div>

        {/* Package Booking */}
        <div className="glass-panel physics-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--accent-color)', padding: '12px', borderRadius: '50%', color: 'white' }}>
              <Activity size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary-dark)' }}>Adventure Package</h3>
              {packageBooking ? (
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>{packageBooking.title} ({packageBooking.activity})</p>
              ) : (
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>No active package bookings.</p>
              )}
            </div>
          </div>
          {packageBooking && (
            <button 
              onClick={() => handleCancelBooking(packageBooking.id)}
              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
            >
              <Trash2 size={16} /> Cancel
            </button>
          )}
        </div>

        {/* Guide Request */}
        <div className="glass-panel physics-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--secondary-color)', padding: '12px', borderRadius: '50%', color: 'white' }}>
              <UserCircle size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary-dark)' }}>Local Guide</h3>
              {guideRequest ? (
                <div style={{ margin: '4px 0 0 0' }}>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                    Guide: <strong>{guideRequest.guideName}</strong>
                  </p>
                  {guideRequest.status === 'pending' ? (
                    <p style={{ margin: '4px 0 0 0', color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      ⏳ Request Pending — Waiting for guide approval
                    </p>
                  ) : guideRequest.status === 'accepted' ? (
                    <p style={{ margin: '4px 0 0 0', color: '#22c55e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      ✅ Booking Confirmed — Guide accepted your request!
                    </p>
                  ) : (
                    <p style={{ margin: '4px 0 0 0', color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      ❌ Rejected — Guide declined your request
                    </p>
                  )}
                </div>
              ) : (
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>No active guide requests.</p>
              )}
            </div>
          </div>
          {guideRequest && (
            <button 
              onClick={() => handleCancelGuide(guideRequest.id)}
              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
            >
              <Trash2 size={16} /> Cancel
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyBookings;

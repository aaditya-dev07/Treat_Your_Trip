import React from 'react';
import { X, User, MapPin, Globe } from 'lucide-react';

const ProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="glass-panel profile-modal animate-slide-up" 
        onClick={e => e.stopPropagation()}
        style={{ padding: '2.5rem', position: 'relative', width: '90%', maxWidth: '400px', background: 'var(--surface-color)' }}
      >
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }}
        >
          <X size={24} />
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', 
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem', fontWeight: 600, margin: '0 auto 1rem auto',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }}>
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)' }}>{user.username}</h2>
          <p style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.type} Account</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px' }}>
            <User className="text-primary" />
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>Username</p>
              <p style={{ fontWeight: 500 }}>{user.username}</p>
            </div>
          </div>

          {user.type === 'guide' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px' }}>
                <MapPin className="text-secondary" />
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>Local Country</p>
                  <p style={{ fontWeight: 500 }}>{user.country}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px' }}>
                <Globe className="text-accent" style={{ marginTop: '4px' }}/>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Languages</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {user.languages?.map(lang => (
                        <span key={lang} style={{ background: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 500, border: '1px solid #e5e7eb' }}>
                        {lang}
                        </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

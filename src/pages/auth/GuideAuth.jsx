import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../../db/storage';
import { PlaneTakeoff } from 'lucide-react';

const COUNTRIES = ['Nepal', 'India', 'Switzerland'];
const LANGUAGES = ['English', 'Nepali', 'Hindi', 'French', 'German'];

const GuideAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '',
    country: 'Nepal',
    languages: []
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLanguageToggle = (lang) => {
    setFormData(prev => {
      const langs = prev.languages.includes(lang) 
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang];
      return { ...prev, languages: langs };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        const user = StorageService.loginUser(formData.username, formData.password);
        if (user.type !== 'guide') throw new Error('Invalid account type');
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/guide/dashboard');
      } else {
        if (formData.languages.length === 0) {
          throw new Error('Please select at least one language.');
        }
        const newUser = StorageService.registerUser({ ...formData, type: 'guide' });
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        navigate('/guide/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* Left Side: Auth Form */}
      <div style={{ width: '100%', maxWidth: '550px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', background: 'white', overflowY: 'auto' }}>
        <div className="glass-panel" style={{ width: '100%', background: 'transparent', boxShadow: 'none', border: 'none' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--accent-color)', borderRadius: '50%', marginBottom: '1rem' }}>
              <PlaneTakeoff color="white" size={32} />
            </div>
            <h2 className="colorful-gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Treat Your Trips</h2>
            <p style={{ color: 'var(--text-muted)' }}>Guide Portal. Lead the way.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter your username"
                required
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {!isLogin && (
              <>
                <div className="form-group animate-fade-in">
                  <label className="form-label">Country of Expertise</label>
                  <select 
                    className="input-field"
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                  >
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="form-group animate-fade-in">
                  <label className="form-label">Languages Known</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {LANGUAGES.map(lang => (
                      <button
                        type="button"
                        key={lang}
                        onClick={() => handleLanguageToggle(lang)}
                        className={`btn-secondary`}
                        style={{ 
                          padding: '6px 12px', 
                          fontSize: '0.875rem',
                          background: formData.languages.includes(lang) ? 'var(--primary-color)' : 'white',
                          color: formData.languages.includes(lang) ? 'white' : 'var(--primary-color)',
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent-color), #ff9800)', width: '100%', marginTop: '1rem', padding: '0.75rem', fontSize: '1.1rem' }}>
              {isLogin ? 'Sign In as Guide' : 'Register as Guide'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              style={{ background: 'none', border: 'none', color: 'var(--accent-color)', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}
            >
              {isLogin ? "Apply to be a Guide" : "Already a Guide? Sign in"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Right Side: Cinematic Media */}
      <div className="auth-media-side" style={{ flex: 1, position: 'relative' }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="https://cdn.pixabay.com/video/2023/04/30/161071-822582138_large.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to left, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.8))' }}></div>
        <div style={{ position: 'absolute', bottom: '4rem', right: '4rem', color: 'white', maxWidth: '80%', textAlign: 'right' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>Share Your World.</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>Connect with passionate travelers and turn your local expertise into unforgettable experiences.</p>
        </div>
      </div>

    </div>
  );
};

export default GuideAuth;

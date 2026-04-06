import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../../db/storage';
import { PlaneTakeoff } from 'lucide-react';

const TouristAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        const user = StorageService.loginUser(formData.username, formData.password);
        if (user.type !== 'tourist') throw new Error('Invalid account type');
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/tourist/dashboard');
      } else {
        const newUser = StorageService.registerUser({ ...formData, type: 'tourist' });
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        navigate('/tourist/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* Left Side: Cinematic Media */}
      <div className="auth-media-side" style={{ flex: 1, position: 'relative' }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="https://cdn.pixabay.com/video/2023/01/29/148409-794343876_large.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.8))' }}></div>
        <div style={{ position: 'absolute', bottom: '4rem', left: '4rem', color: 'white', maxWidth: '80%' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>Discover Your Next <br/>Great Adventure.</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>Join treated travelers all over the world exploring breathtaking destinations with local experts.</p>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div style={{ width: '100%', maxWidth: '550px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', background: 'white' }}>
        <div className="glass-panel" style={{ width: '100%', background: 'transparent', boxShadow: 'none', border: 'none' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--primary-light)', borderRadius: '50%', marginBottom: '1rem' }}>
              <PlaneTakeoff color="white" size={32} />
            </div>
            <h2 className="colorful-gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Treat Your Trips</h2>
            <p style={{ color: 'var(--text-muted)' }}>Sign in to plan your perfect getaway</p>
          </div>
          
          <h2 className="auth-title">Tourist {isLogin ? 'Sign In' : 'Register'}</h2>
          <p className="auth-subtitle">
            {isLogin ? 'Welcome back, traveler!' : 'Start your adventure today.'}
          </p>

          <form onSubmit={handleSubmit}>
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

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', fontSize: '1.1rem' }}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristAuth;

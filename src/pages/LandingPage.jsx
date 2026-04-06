import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneTakeoff, Map, Heart } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="page-container" style={{ position: 'relative' }}>
      {/* Video Background */}
      <div className="video-bg-container">
        <video autoPlay loop muted playsInline>
          <source src="https://cdn.pixabay.com/video/2020/05/25/40156-424707204_large.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="dashboard-nav glass-panel" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <div className="nav-logo" style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          <PlaneTakeoff className="text-accent" size={32} />
          <span>Treat Your Trips</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="main-content flex-center" style={{ flex: 1, zIndex: 10 }}>
        <div style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h1 className="auth-title animate-fade-in" style={{ fontSize: '4.5rem', marginBottom: '1rem', color: 'white', textShadow: '0 4px 12px rgba(0,0,0,0.4)', fontWeight: 800 }}>
            <span className="colorful-gradient-text" style={{ textShadow: 'none', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>Treat Your Trips</span>
          </h1>
          <p className="auth-subtitle animate-slide-in" style={{ fontSize: '1.4rem', marginBottom: '3rem', color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Connect with local experts, explore breathtaking packages, 
            and book stunning stays globally.
          </p>
          
          <div className="flex-center animate-fade-in" style={{ gap: '2rem', animationDelay: '0.2s' }}>
            <div className="glass-panel" style={{ padding: '2rem', width: '300px' }}>
              <Map size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>I am a Tourist</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Hire guides, book hotels, and find adventurous packages for your next trip.
              </p>
              <Link to="/auth/tourist" className="btn-primary" style={{ width: '100%' }}>
                Enter as Tourist
              </Link>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', width: '300px' }}>
              <Heart size={48} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>I am a Guide</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Join our platform, offer your linguistic and local expertise to travelers globally.
              </p>
              <Link to="/auth/guide" className="btn-secondary" style={{ width: '100%' }}>
                Enter as Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import React, { useState } from 'react';
import { MapPin, ArrowRight, X } from 'lucide-react';

const DESTINATIONS = [
  {
    id: 'd1',
    name: 'Nepal',
    desc: 'The roof of the world. Home to the majestic Himalayas, vibrant culture, and unparalleled trekking trails.',
    image: 'https://images.unsplash.com/photo-1597666864156-2e7ae49fca5a?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1597666864156-2e7ae49fca5a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1662379273654-242d1abe1a96?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1647679208171-85d25dcc22c2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1520262454473-a1a82276a574?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'd2',
    name: 'India',
    desc: 'A land of incredible diversity. From architectural marvels to deeply rooted spiritual traditions.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'd3',
    name: 'Switzerland',
    desc: 'Alpine beauty at its finest. Crystal clear lakes, snow-capped peaks, and charming winter villages await.',
    image: 'https://images.unsplash.com/photo-1751416387664-5b586cca5052?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1751416387664-5b586cca5052?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1735684510427-3865be889d83?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800'
    ]
  }
];

const Destinations = () => {
  const [selectedDest, setSelectedDest] = useState(null);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
          Explore Popular Destinations
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Discover the beauty and adventure waiting for you across the globe.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {DESTINATIONS.map(dest => (
          <div key={dest.id} className="physics-card glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{ position: 'relative', height: '300px' }}>
              <img 
                src={dest.image} 
                alt={dest.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ 
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))' 
              }}></div>
              
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', color: 'white' }}>
                <h3 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'white' }}>
                  <MapPin size={24} color="var(--accent-color)" /> {dest.name}
                </h3>
                <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5 }}>
                  {dest.desc}
                </p>
                <button 
                  onClick={() => setSelectedDest(dest)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontWeight: 600, marginTop: '1rem', border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  Explore Highlights <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDest && (
        <div 
          className="modal-overlay animate-fade-in" 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          onClick={() => setSelectedDest(null)}
        >
          <div 
            className="glass-panel animate-scale-in" 
            style={{ width: '100%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto', background: 'white', padding: '2rem', borderRadius: '16px' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>
                {selectedDest.name} Gallery
              </h2>
              <button onClick={() => setSelectedDest(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
                <X size={28} color="var(--text-muted)" />
              </button>
            </div>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>{selectedDest.desc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {selectedDest.gallery.map((imgUrl, idx) => (
                <div key={idx} className="physics-card" style={{ height: '250px', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src={imgUrl} alt={`${selectedDest.name} scenery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;

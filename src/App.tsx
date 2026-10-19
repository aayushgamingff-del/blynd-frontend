import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  X, 
  Star, 
  Sparkles, 
  Sun, 
  Moon, 
  Database, 
  Image as ImageIcon, 
  Zap, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Flame,
  Layers
} from 'lucide-react';
import './App.css';

interface HealthData {
  status: string;
  service: string;
  database: string;
  timestamp: string;
}

const SAMPLE_PROFILES = [
  {
    name: 'Kiara',
    age: 23,
    distance: '3 km away',
    bio: 'Architect & sunset lover. Coffee first, deep conversations later ✨',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    tags: ['Architecture', 'Coffee', 'Indie Music']
  },
  {
    name: 'Rohan',
    age: 26,
    distance: '5 km away',
    bio: 'Product designer building cool things. Looking for someone to explore new vinyl bars with 🎵',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    tags: ['Design', 'Vinyl Records', 'Travel']
  },
  {
    name: 'Tara',
    age: 24,
    distance: '1.8 km away',
    bio: 'Psychology graduate, amateur baker, dog mom 🐶 Always down for late night drives.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    tags: ['Psychology', 'Baking', 'Dogs']
  }
];

export default function App() {
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('dark');
  const [profileIndex, setProfileIndex] = useState(0);
  const [swipeAction, setSwipeAction] = useState<string | null>(null);
  const [backendHealth, setBackendHealth] = useState<HealthData | null>(null);

  // Poll backend health status
  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setBackendHealth(data))
      .catch(() => {
        setBackendHealth({
          status: 'offline',
          service: 'Blynd API',
          database: 'Disconnected',
          timestamp: new Date().toISOString()
        });
      });
  }, []);

  const handleSwipe = (type: 'like' | 'pass' | 'superlike') => {
    setSwipeAction(type);
    if (type === 'like' || type === 'superlike') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    setTimeout(() => {
      setSwipeAction(null);
      setProfileIndex((prev) => (prev + 1) % SAMPLE_PROFILES.length);
    }, 400);
  };

  const currentProfile = SAMPLE_PROFILES[profileIndex];

  return (
    <main className="app-container">
      {/* Header Bar */}
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img 
            src="/dark-mode-logo.png" 
            alt="Blynd Logo" 
            style={{ height: '40px', objectFit: 'contain' }} 
          />
          <span className="brand-badge">
            <Flame size={14} /> Production Preview
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div className="backend-indicator">
            <span className="indicator-dot" />
            Backend API: {backendHealth?.status === 'ok' ? 'Online (Port 5000)' : 'Connecting...'}
          </div>
          <a 
            href="https://github.com/aayushgamingff-del/blynd-frontend" 
            target="_blank" 
            rel="noreferrer"
            className="secondary-btn"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            GitHub Repo <ExternalLink size={14} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="brand-badge" style={{ marginBottom: '20px' }}>
          <Sparkles size={14} /> Official Brand Assets
        </div>
        <h1 className="hero-title">
          Blynd Brand Identity & <span className="gradient-text">Architecture</span>
        </h1>
        <p className="hero-subtitle">
          Engineered for 1 Crore (10 Million) users. Featuring responsive branding with dedicated Light and Dark mode emblems.
        </p>

        {/* Scalability Highlights */}
        <div className="architecture-pills">
          <div className="arch-pill">
            <Database size={16} color="#38BDF8" /> MySQL 8.0 with Spatial Indexing
          </div>
          <div className="arch-pill">
            <ImageIcon size={16} color="#EC4899" /> Cloudinary Media Engine
          </div>
          <div className="arch-pill">
            <Zap size={16} color="#FBBF24" /> Real-time Socket.io Chat
          </div>
          <div className="arch-pill">
            <ShieldCheck size={16} color="#34D399" /> JWT Authentication
          </div>
        </div>
      </section>

      {/* Dual Logo Showcase Grid */}
      <section className="showcase-grid">
        {/* Light Mode Logo Card */}
        <div className="glass-panel showcase-card">
          <div className="card-top">
            <span className="card-badge light">Light Mode Asset</span>
            <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>PNG Transparent</span>
          </div>
          
          <div className="logo-display-stage stage-light">
            <img 
              src="/light-mode-logo.png" 
              alt="Blynd Light Mode Logo" 
              className="logo-image" 
            />
          </div>

          <div className="card-details">
            <h3 className="card-title">Light Mode Logo with Tagline</h3>
            <p className="card-description">
              Optimized with high contrast gradients for crisp rendering against bright backgrounds, white mobile chrome, and light theme landing pages.
            </p>
            <div className="asset-path-box">
              <span>Path: /light-mode-logo.png</span>
              <a 
                href="/light-mode-logo.png" 
                target="_blank" 
                download="light-mode-logo.png"
                style={{ color: '#818CF8', textDecoration: 'none', fontWeight: 600 }}
              >
                Download
              </a>
            </div>
          </div>
        </div>

        {/* Dark Mode Logo Card */}
        <div className="glass-panel showcase-card">
          <div className="card-top">
            <span className="card-badge dark">Dark Mode Asset</span>
            <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>PNG Transparent</span>
          </div>

          <div className="logo-display-stage stage-dark">
            <img 
              src="/dark-mode-logo.png" 
              alt="Blynd Dark Mode Logo" 
              className="logo-image" 
            />
          </div>

          <div className="card-details">
            <h3 className="card-title">Glossy Neon Gradient Emblem</h3>
            <p className="card-description">
              Crafted with vibrant neon magenta and cyan highlights designed to pop against obsidian dark glassmorphism surfaces and OLED night screens.
            </p>
            <div className="asset-path-box">
              <span>Path: /dark-mode-logo.png</span>
              <a 
                href="/dark-mode-logo.png" 
                target="_blank" 
                download="dark-mode-logo.png"
                style={{ color: '#FF6584', textDecoration: 'none', fontWeight: 600 }}
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Theme & Swipe Preview */}
      <section className="glass-panel simulator-section">
        <div className="simulator-header">
          <div>
            <h2 className="simulator-title">
              Interactive In-App <span className="gradient-text">Experience</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
              Switch themes to preview how each logo integrates into the mobile dating interface.
            </p>
          </div>

          <button 
            type="button" 
            className="theme-toggle-btn"
            onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
          >
            {previewTheme === 'dark' ? (
              <>
                <Sun size={18} color="#FBBF24" /> Switch to Light Mode
              </>
            ) : (
              <>
                <Moon size={18} color="#818CF8" /> Switch to Dark Mode
              </>
            )}
          </button>
        </div>

        <div className="mock-device-wrapper">
          <div className={`mock-phone ${previewTheme}`}>
            {/* Phone Top App Bar */}
            <div className="mock-app-bar">
              <img 
                src={previewTheme === 'dark' ? '/dark-mode-logo.png' : '/light-mode-logo.png'} 
                alt="App Header Logo" 
                className="mock-app-logo"
              />
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '3px 8px', 
                  borderRadius: '999px',
                  background: previewTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                  fontWeight: 600
                }}>
                  {previewTheme.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Mock Dating Profile Card */}
            <div className="mock-dating-card">
              <div 
                className="mock-photo-holder"
                style={{ backgroundImage: `url(${currentProfile.photo})` }}
              >
                <div className="mock-card-overlay" />
                <div className="mock-card-info">
                  <div className="mock-user-name">
                    {currentProfile.name}, {currentProfile.age}
                    <CheckCircle2 size={18} className="verified-icon" />
                  </div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.85, marginTop: '2px' }}>
                    📍 {currentProfile.distance}
                  </div>
                  <div className="mock-user-bio">
                    {currentProfile.bio}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {currentProfile.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: '0.7rem',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(4px)',
                        padding: '2px 8px',
                        borderRadius: '999px'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mock-actions-bar">
                <button 
                  type="button"
                  className="action-circle-btn btn-pass"
                  onClick={() => handleSwipe('pass')}
                  title="Pass"
                >
                  <X size={24} />
                </button>
                <button 
                  type="button"
                  className="action-circle-btn btn-superlike"
                  onClick={() => handleSwipe('superlike')}
                  title="Super Like"
                >
                  <Star size={20} />
                </button>
                <button 
                  type="button"
                  className="action-circle-btn btn-like"
                  onClick={() => handleSwipe('like')}
                  title="Like"
                >
                  <Heart size={24} fill="currentColor" />
                </button>
              </div>
            </div>
            
            {swipeAction && (
              <div style={{
                textAlign: 'center',
                marginTop: '10px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: swipeAction === 'like' ? '#FF3366' : swipeAction === 'pass' ? '#EF4444' : '#3B82F6'
              }}>
                {swipeAction === 'like' ? '❤️ Liked!' : swipeAction === 'pass' ? '👋 Passed' : '⭐ Superliked!'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer style={{ textAlign: 'center', marginTop: '48px', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '0.9rem' }}>
          Blynd Architecture — Built with React, Vite, MySQL & Cloudinary
        </p>
        <div className="footer-cta">
          <a 
            href="https://github.com/aayushgamingff-del/blynd-frontend" 
            target="_blank" 
            rel="noreferrer"
            className="primary-btn"
          >
            <Layers size={18} /> Frontend Repository
          </a>
          <a 
            href="https://github.com/aayushgamingff-del/blynd-backend" 
            target="_blank" 
            rel="noreferrer"
            className="secondary-btn"
          >
            <Database size={18} /> Backend Repository
          </a>
        </div>
      </footer>
    </main>
  );
}

import React, { useState } from 'react';
import './App.css';
import Timeline from './components/Timeline';
import MirandaFiles from './components/MirandaFiles';
import QuantStats from './components/QuantStats';
import Crossword from './components/Crossword';
import Countdown from './components/Countdown';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('miranda_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('timeline');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'princesa1') {
      setIsAuthenticated(true);
      localStorage.setItem('miranda_auth', 'true');
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect passcode. Hint: check your title in Mexico 😉');
      setPasswordInput('');
    }
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'timeline':
        return <Timeline />;
      case 'files':
        return <MirandaFiles />;
      case 'quant':
        return <QuantStats />;
      case 'crossword':
        return <Crossword />;
      case 'countdown':
        return <Countdown />;
      default:
        return <Timeline />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="app-workspace login-workspace">
        {/* Decorative Cute Accents */}
        <div className="cute-sparkle sparkle-1">✨</div>
        <div className="cute-sparkle sparkle-2">💖</div>
        <div className="cute-sparkle sparkle-3">🌸</div>
        <div className="cute-sparkle sparkle-4">💫</div>
        <div className="bg-grid-overlay"></div>

        <div className="login-card-container fade-in">
          <div className="login-card">
            <div className="login-header">
              <span className="heart-lock animate-heartbeat">💝</span>
              <h2>The Miranda Files</h2>
              <p>Enter the secret passcode to access our history</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="login-form">
              <input
                type="password"
                placeholder="Passcode..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="login-input"
                autoFocus
              />
              <button type="submit" className="login-btn">Unlock Archives ✨</button>
            </form>

            {errorMsg && <p className="login-error animate-bounce">{errorMsg}</p>}
          </div>

          <div className="login-footer">
            <p>Made with love &amp; gratitude</p>
            <p className="noam-sig">© {new Date().getFullYear()} Noam</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-workspace">
      {/* Decorative Cute Accents */}
      <div className="cute-sparkle sparkle-1">✨</div>
      <div className="cute-sparkle sparkle-2">💖</div>
      <div className="cute-sparkle sparkle-3">🌸</div>
      <div className="cute-sparkle sparkle-4">💫</div>
      <div className="bg-grid-overlay"></div>

      {/* Main Workspace Frame */}
      <div className="frame-container">
        
        {/* Navigation Sidebar */}
        <nav className="nav-panel">
          <div className="nav-logo">
            <span className="brand-icon">🎀</span>
            <div>
              <h2>The Miranda Files</h2>
              <p>Adventures &amp; Gratitude</p>
              <div className="zodiac-badge-sidebar">Taurus ♉ + Cancer ♋</div>
            </div>
          </div>

          <div className="nav-menu">
            <button 
              className={`nav-item-btn ${activeTab === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveTab('timeline')}
            >
              <span className="nav-icon">📖</span>
              <span>Our Timeline</span>
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'files' ? 'active' : ''}`}
              onClick={() => setActiveTab('files')}
            >
              <span className="nav-icon">🗂️</span>
              <span>Miranda Files</span>
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'quant' ? 'active' : ''}`}
              onClick={() => setActiveTab('quant')}
            >
              <span className="nav-icon">📊</span>
              <span>Quant Audit</span>
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'crossword' ? 'active' : ''}`}
              onClick={() => setActiveTab('crossword')}
            >
              <span className="nav-icon">🧩</span>
              <span>Crossword Puzzle</span>
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'countdown' ? 'active' : ''}`}
              onClick={() => setActiveTab('countdown')}
            >
              <span className="nav-icon">🇳🇱</span>
              <span>Amsterdam Goal</span>
            </button>
          </div>

          <div className="nav-footer">
            <p>Made with love &amp; gratitude</p>
            <p className="noam-sig">© {new Date().getFullYear()} Noam</p>
          </div>
        </nav>

        {/* Content Panel */}
        <main className="content-panel">
          <div className="content-viewport">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}

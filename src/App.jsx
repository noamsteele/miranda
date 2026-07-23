import React, { useState } from 'react';
import './App.css';
import Memories from './components/Memories';
import MirandaFiles from './components/MirandaFiles';
import Countdowns from './components/Countdowns';
import Crossword from './components/Crossword';
import Countdown from './components/Countdown';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('miranda_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('memories');
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'princesa1') {
      setIsUnlocking(true);
      setErrorMsg('');

      // Step 1: Switch Authentication 750ms in, when the heart covers the viewport
      setTimeout(() => {
        setIsAuthenticated(true);
        localStorage.setItem('miranda_auth', 'true');
      }, 750);

      // Step 2: Complete the animation and remove the overlay at 1250ms
      setTimeout(() => {
        setIsUnlocking(false);
      }, 1250);
    } else {
      setErrorMsg('try again beautiful :)');
      setPasswordInput('');
    }
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'memories':
        return <Memories />;
      case 'files':
        return <MirandaFiles />;
      case 'quant':
        return <Countdowns />;
      case 'crossword':
        return <Crossword />;
      case 'countdown':
        return <Countdown />;
      default:
        return <Memories />;
    }
  };

  return (
    <div className="app-container-root">
      {/* Cinematic Heart-Expansion Transition Overlay */}
      {isUnlocking && (
        <div className="heart-expand-overlay">
          <div className="expanding-heart"></div>
        </div>
      )}

      {!isAuthenticated ? (
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
                <img src="/images/heart_ribbon.png" className="heart-lock animate-heartbeat" alt="Heart Lock" />
                <h2>The Miranda Files</h2>
                <p>Enter the secret passcode to access our history</p>
              </div>
              
              <form onSubmit={handleLoginSubmit} className="login-form">
                <div className="passcode-input-wrapper">
                  <input
                    type="text"
                    className="login-input hidden-text"
                    placeholder=""
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    autoFocus
                  />
                  <div className="hearts-overlay">
                    {passwordInput.length === 0 ? (
                      <span className="placeholder-text">Passcode...</span>
                    ) : (
                      passwordInput.split('').map((_, i) => (
                        <span key={i} className="heart-char">♥</span>
                      ))
                    )}
                  </div>
                </div>
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
      ) : (
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
                  <p>For your eyes only</p>
                  <div className="zodiac-badge-sidebar">Taurus ♉ + Cancer ♋</div>
                </div>
              </div>

              <div className="nav-menu">
                <button 
                  className={`nav-item-btn ${activeTab === 'memories' ? 'active' : ''}`}
                  onClick={() => setActiveTab('memories')}
                >
                  <span className="nav-icon">📸</span>
                  <span>Our Memories</span>
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
                  <span className="nav-icon">⏳</span>
                  <span>Our Countdowns</span>
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
      )}
    </div>
  );
}

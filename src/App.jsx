import React, { useState, useEffect } from 'react';
import './App.css';
import Timeline from './components/Timeline';
import MirandaFiles from './components/MirandaFiles';
import QuantStats from './components/QuantStats';
import Crossword from './components/Crossword';
import Countdown from './components/Countdown';

export default function App() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [callTime, setCallTime] = useState({ hrs: 96, mins: 30, secs: 0 });

  // Simulate FaceTime ticking call timer starting from 96:30:00
  useEffect(() => {
    const interval = setInterval(() => {
      setCallTime(prev => {
        let s = prev.secs + 1;
        let m = prev.mins;
        let h = prev.hrs;
        if (s >= 60) {
          s = 0;
          m += 1;
        }
        if (m >= 60) {
          m = 0;
          h += 1;
        }
        return { hrs: h, mins: m, secs: s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="app-workspace">
      {/* Decorative Glows */}
      <div className="bg-glow bg-glow-primary"></div>
      <div className="bg-glow bg-glow-secondary"></div>
      <div className="bg-grid-overlay"></div>

      {/* FaceTime Status Ribbon */}
      <header className="facetime-header">
        <div className="header-left">
          <div className="pulsing-green-dot"></div>
          <span className="ft-avatar">📞</span>
          <span className="ft-partner-name">Miranda ♡</span>
        </div>
        <div className="header-center">
          <span className="ft-timer">
            Connected: {callTime.hrs}h {callTime.mins.toString().padStart(2, '0')}m {callTime.secs.toString().padStart(2, '0')}s
          </span>
        </div>
        <div className="header-right">
          <span className="badge-premium">Taurus ♉ + Cancer ♋</span>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="frame-container">
        
        {/* Navigation Sidebar */}
        <nav className="nav-panel">
          <div className="nav-logo">
            <span className="brand-icon">✨</span>
            <div>
              <h2>The Miranda Files</h2>
              <p>Adventures &amp; Gratitude</p>
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

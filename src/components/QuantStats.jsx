import React from 'react';

const STATS_DATA = [
  {
    label: "FaceTime Call log",
    value: "96h 30m",
    subtext: "Across 9 intensive days",
    category: "Communication",
    icon: "📞",
    percentage: 100
  },
  {
    label: "Spontaneous Flights",
    value: "1",
    subtext: "Vancouver ➔ Monterrey, MX",
    category: "Adventure",
    icon: "✈️",
    percentage: 100
  },
  {
    label: "Crosswords Solved",
    value: "12",
    subtext: "Best time: Saturday under 40m",
    category: "Wholesome",
    icon: "🧩",
    percentage: 85
  },
  {
    label: "Copied Tacos Recipes",
    value: "100%",
    subtext: "FaceTime cooking dates",
    category: "Culinary",
    icon: "🌮",
    percentage: 100
  },
  {
    label: "Birthday Chef Knives",
    value: "1",
    subtext: "240mm Damascus Wa-Gyuto",
    category: "Gifts",
    icon: "🔪",
    percentage: 100
  },
  {
    label: "Matching Whistler Hats",
    value: "2",
    subtext: "Corduroy green",
    category: "Fashion",
    icon: "🧢",
    percentage: 100
  },
  {
    label: "Butterflies Level",
    value: "110%",
    subtext: "Whenever she appears on screen",
    category: "Vibe",
    icon: "🦋",
    percentage: 110
  },
  {
    label: "Yapping Speed",
    value: "Infinite",
    subtext: "Continuous hours, zero pauses",
    category: "Talk",
    icon: "💬",
    percentage: 95
  }
];

export default function QuantStats() {
  return (
    <div className="stats-dashboard">
      <div className="dashboard-header">
        <span className="accent-tag">The Miranda Files Audit</span>
        <h3>Relationship Ledger &amp; Quant Analytics</h3>
        <p className="dashboard-caption">Analyzed data from April 2026 to Present</p>
      </div>

      <div className="stats-grid">
        {STATS_DATA.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-category">{stat.category}</span>
              <span className="stat-icon">{stat.icon}</span>
            </div>
            
            <div className="stat-value-container">
              <h4 className="stat-value">{stat.value}</h4>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-subtext">{stat.subtext}</p>
            </div>

            <div className="stat-progress-bar">
              <div 
                className="stat-progress-fill" 
                style={{ width: `${Math.min(stat.percentage, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-report-card">
        <div className="report-graphic">
          <div className="glowing-circle">
            <span className="heart-emoji">❤️</span>
          </div>
        </div>
        <div className="report-details">
          <h4>Astrological Compatibility Index</h4>
          <div className="sign-match">
            <span className="zodiac taurus">Taurus (Noam) ♉</span>
            <span className="divider-icon">⚡</span>
            <span className="zodiac cancer">Cancer (Miranda) ♋</span>
          </div>
          <p>
            Earth meets Water. Highly strategic &amp; structured logic combined with deep emotional warmth and graphic design intuition. Result: A certified rom-com power couple.
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

const STATS_DATA = [
  {
    label: "FaceTime Call log",
    value: "200h 30m",
    subtext: "In only 3 months",
    category: "Communication",
    icon: "📞",
    percentage: 100
  },
  {
    label: "Spontaneous Flights",
    value: "3",
    subtext: "Vegas, Monterrey, Vancouver",
    category: "Adventure",
    icon: "✈️",
    percentage: 100
  },
  {
    label: "Fastest Crossword",
    value: "22m",
    subtext: "Best time: Saturday",
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
    label: "You look beautiful",
    value: "Everyday",
    subtext: "I stare at you in awe",
    category: "My Thoughts",
    icon: "👀",
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
    label: "Butterflies",
    value: "110%",
    subtext: "Whenever you're on my screen",
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
    </div>
  );
}

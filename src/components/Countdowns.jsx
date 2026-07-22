import React, { useState, useEffect } from 'react';

const COUNTDOWNS_DATA = [
  {
    label: "Until I get to see you next",
    target: new Date('2026-09-01T00:00:00'),
    displayDate: "Sept, 2026",
    icon: "👀",
    category: "Reunion"
  },
  {
    label: "Until you come to see me next",
    target: new Date('2026-11-01T00:00:00'),
    displayDate: "Nov, 2026",
    icon: "✈️",
    category: "Reunion"
  },
  {
    label: "Until our first Christmas together",
    target: new Date('2026-12-25T00:00:00'),
    displayDate: "Dec, 2026",
    icon: "🎄",
    category: "Holiday"
  },
  {
    label: "Until our first valentines day",
    target: new Date('2027-02-14T00:00:00'),
    displayDate: "Feb 14th, 2027",
    icon: "💝",
    category: "Romance"
  },
  {
    label: "Until our one year anniversary",
    target: new Date('2027-05-01T00:00:00'),
    displayDate: "May 1st, 2027",
    icon: "✨",
    category: "Milestone"
  },
  {
    label: "Until your graduation",
    target: new Date('2027-05-15T00:00:00'),
    displayDate: "May, 2027",
    icon: "🎓",
    category: "Celebration"
  },
  {
    label: "Until we move in together",
    target: new Date('2027-07-01T00:00:00'),
    displayDate: "July, 2027",
    icon: "🏠",
    category: "Chapter"
  }
];

const DAYS_SINCE_DATA = [
  {
    label: "Since we had our first kiss",
    target: new Date('2026-04-03T00:00:00'),
    displayDate: "April 3rd, 2026",
    icon: "💋",
    category: "Firsts"
  },
  {
    label: "Since you invited me to a wedding",
    target: new Date('2026-04-03T00:00:00'),
    displayDate: "April 3rd, 2026",
    icon: "💍",
    category: "Spontaneous"
  },
  {
    label: "Since we cooked our first meal together",
    target: new Date('2026-04-14T00:00:00'),
    displayDate: "April 14th, 2026",
    icon: "🌮",
    category: "FaceTime"
  },
  {
    label: "Since you first picked me up from the airport",
    target: new Date('2026-05-01T00:00:00'),
    displayDate: "May 1st, 2026",
    icon: "🚗",
    category: "Travel"
  },
  {
    label: "Since I asked you to be mine",
    target: new Date('2026-05-01T00:00:00'),
    displayDate: "May 1st, 2026",
    icon: "💝",
    category: "Milestone"
  },
  {
    label: "Since we said \"I love you\"",
    target: new Date('2026-05-02T00:00:00'),
    displayDate: "May 2nd, 2026",
    icon: "❤️",
    category: "Expression"
  },
  {
    label: "Since you introduced me to your family",
    target: new Date('2026-05-03T00:00:00'),
    displayDate: "May 3rd, 2026",
    icon: "👨‍👩‍👧‍👦",
    category: "Family"
  },
  {
    label: "Since you flew to come visit me for the first time",
    target: new Date('2026-05-18T00:00:00'),
    displayDate: "May 18th, 2026",
    icon: "✈️",
    category: "Visit"
  },
  {
    label: "Since we went to my home for the first time",
    target: new Date('2026-05-20T00:00:00'),
    displayDate: "May 20th, 2026",
    icon: "🏡",
    category: "Home"
  },
  {
    label: "Since the night we saw a shooting star",
    target: new Date('2026-05-22T00:00:00'),
    displayDate: "May 22nd, 2026",
    icon: "💫",
    category: "Magical"
  }
];

export default function Countdowns() {
  const [activeSubtab, setActiveSubtab] = useState('countdown');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (target) => {
    const diff = target - now;
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, expired: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    return { days, hours, mins, secs, expired: false };
  };

  const getDaysSince = (target) => {
    const diff = now - target;
    if (diff <= 0) return 0;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="stats-dashboard">
      {/* Subtabs Header Control */}
      <div className="countdown-tab-container">
        <button 
          className={`countdown-tab-btn ${activeSubtab === 'countdown' ? 'active' : ''}`}
          onClick={() => setActiveSubtab('countdown')}
        >
          <span className="tab-icon">⏳</span> Our Countdowns
        </button>
        <button 
          className={`countdown-tab-btn ${activeSubtab === 'since' ? 'active' : ''}`}
          onClick={() => setActiveSubtab('since')}
        >
          <span className="tab-icon">🌸</span> Days Since
        </button>
      </div>

      {activeSubtab === 'countdown' ? (
        <div className="fade-in">
          <div className="dashboard-header">
            <span className="accent-tag">🕰️ Counting down the days</span>
            <h3>Our Countdowns</h3>
            <p className="dashboard-caption">
              “You know I love counting down till the next time I see you, but I thought you should know all the things I’m counting down for”
            </p>
          </div>

          <div className="countdown-list text-left">
            {COUNTDOWNS_DATA.map((item, idx) => {
              const { days, hours, mins, secs, expired } = formatCountdown(item.target);
              return (
                <div key={idx} className="countdown-list-item">
                  <div className="list-item-left">
                    <div className="list-item-badge">
                      {item.icon}
                    </div>
                    <div className="list-item-details">
                      <span className="list-item-category">{item.category}</span>
                      <h4 className="list-item-title">{item.label}</h4>
                      <p className="list-item-date">📅 Target: {item.displayDate}</p>
                    </div>
                  </div>

                  <div className="list-item-right">
                    {expired ? (
                      <span className="list-ticker text-accent">🎉 Today!</span>
                    ) : (
                      <span className="list-ticker countdown-ticker">
                        {days}<span className="ticker-unit">d</span> {hours}<span className="ticker-unit">h</span> {mins}<span className="ticker-unit">m</span> {secs}<span className="ticker-unit">s</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="fade-in">
          <div className="dashboard-header">
            <span className="accent-tag">🌸 Cherishing every second</span>
            <h3>Days Since</h3>
            <p className="dashboard-caption">
              “Although I am sooooo excited for all of the things we have to look forward to, I will also always remember all of the amazing moments we have already gotten together”
            </p>
          </div>

          <div className="countdown-list text-left">
            {DAYS_SINCE_DATA.map((item, idx) => {
              const daysTotal = getDaysSince(item.target);
              return (
                <div key={idx} className="countdown-list-item">
                  <div className="list-item-left">
                    <div className="list-item-badge badge-past">
                      {item.icon}
                    </div>
                    <div className="list-item-details">
                      <span className="list-item-category">{item.category}</span>
                      <h4 className="list-item-title">{item.label}</h4>
                      <p className="list-item-date">📅 Occurred: {item.displayDate}</p>
                    </div>
                  </div>

                  <div className="list-item-right">
                    <span className="list-ticker text-glow">
                      {daysTotal} <span className="ticker-unit">days</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';

const TIMELINE_EVENTS = [
  {
    date: "April 2026",
    title: "Vegas Spark",
    location: "Las Vegas, Nevada 🎰",
    subtitle: "A Spontaneous Spark",
    summary: "Introduced by a mutual friend at the last minute, leading to a whirlwind four-day romance that defied all expectations.",
    quote: "You went from 'the guy from Vegas' to a 'legend' in her friend group for actually booking a flight to see her.",
    details: [
      "Noam invited last minute to Vegas by a friend.",
      "Introduced to Miranda's best friend (Miranda!) and hit it off completely.",
      "Engaged in a beautiful whirlwind romance in the desert heat.",
      "Miranda invites Noam as her +1 to a wedding in Monterrey, Mexico."
    ],
    icon: "✨",
    theme: "purple"
  },
  {
    date: "April - May 2026",
    title: "FaceTime Era",
    location: "Vancouver ⇄ Monterrey 📞",
    subtitle: "96.5 Hours of Yapping",
    summary: "Bridging the distance by yapping for hours, cooking meals together, and finding comfort in crosswords.",
    quote: "We can talk for hours and never run out of things to say. Face-aching smiles all night.",
    details: [
      "Logged over 96.5 hours of FaceTime calls in just a couple of weeks.",
      "Taught each other cooking: Tacos & Gyozas face-to-face over screens.",
      "Began solving crosswords together as a wholesome late-night activity.",
      "Created 'The Miranda Files' to track all the cute, quirky notes."
    ],
    icon: "📱",
    theme: "rose"
  },
  {
    date: "May 2026",
    title: "Monterrey Sequel",
    location: "Monterrey, Mexico ⛰️",
    subtitle: "Meeting the Family & Confessing Love",
    summary: "A high-stakes rom-com week: wedding dancing, parents reuniting, and saying 'I love you' for the first time.",
    quote: "COMING TO MONTERREY WAS THE BEST DECISION I'VE EVER MADE. I LOVE YOU, MIRANDA. 🤍",
    details: [
      "Noam flew to Mexico spontaneously as Miranda's wedding plus-one.",
      "Became the calm 'safe harbor' when both of her separated parents visited for the first time in 10 years.",
      "Shared details of life and admitted true feelings: fell deeply in love.",
      "Left secret sticky notes all around her apartment before flying back."
    ],
    icon: "🇲🇽",
    theme: "amber"
  },
  {
    date: "May - July 2026",
    title: "Canadian Summer",
    location: "Vancouver & Whistler, Canada 🌲",
    subtitle: "Cohabitation & Coordination",
    summary: "Miranda stayed in Canada for 6 weeks. Days spent hiking, wearing matching corduroy Whistler hats, and celebrating birthdays.",
    quote: "You are, without a doubt, the best decision I have ever made. Happy Birthday, mi reina.",
    details: [
      "Miranda visited Vancouver from May 18th to July 5th.",
      "Created unforgettable memories in Whistler (wearing matching green hats).",
      "Celebrated Miranda's birthday with a professional 240mm Damascus Wa-Gyuto chef's knife.",
      "Compiled logs and documentation for visa applications."
    ],
    icon: "🇨🇦",
    theme: "emerald"
  },
  {
    date: "January 2027",
    title: "Amsterdam Chapter",
    location: "Amsterdam, Netherlands 🇳🇱",
    subtitle: "The Grand Design",
    summary: "Taking on Europe. Moving into an apartment together in Amsterdam utilizing Noam's Orientation Year (Zoekjaar) visa.",
    quote: "She is the only person I'd alter my life path for.",
    details: [
      "Noam uses his UBC top-200 computer science qualification for a Zoekjaar visa.",
      "Sponsoring Miranda on a partner visa with full work rights in the Netherlands.",
      "Moving in together in Amsterdam to blend graphic design and software development.",
      "Building a solid, shared life across the Atlantic."
    ],
    icon: "🇳🇱",
    theme: "blue"
  }
];

export default function Timeline() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="timeline-section">
      <div className="timeline-header">
        <span className="accent-tag">The Story of Us</span>
        <h3>Our Whirlwind Adventure</h3>
        <p className="timeline-caption">
          A chronicle of spontaneity, yapping, and the grand design of our relationship
        </p>
      </div>

      <div className="timeline-container">
        {/* Progress Line */}
        <div className="timeline-line">
          <div 
            className="timeline-line-fill" 
            style={{ height: `${(activeIdx / (TIMELINE_EVENTS.length - 1)) * 100}%` }}
          ></div>
        </div>

        {/* Timeline Nodes */}
        <div className="timeline-nodes-wrapper">
          {TIMELINE_EVENTS.map((event, idx) => {
            const isActive = idx === activeIdx;
            const isCompleted = idx < activeIdx;
            return (
              <div 
                key={idx} 
                className={`timeline-node-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <div className={`timeline-node-dot dot-${event.theme}`}>
                  <span className="node-icon">{event.icon}</span>
                </div>
                <div className="timeline-node-content">
                  <span className="event-date">{event.date}</span>
                  <h4 className="event-title">{event.title}</h4>
                  <span className="event-location">{event.location}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Event Detail Display Card */}
        <div className="timeline-detail-card">
          <div className="card-ambient-glow"></div>
          <div className="detail-tag">
            <span className="detail-tag-text">{TIMELINE_EVENTS[activeIdx].subtitle}</span>
          </div>
          
          <h4 className="detail-title">{TIMELINE_EVENTS[activeIdx].title}</h4>
          <span className="detail-location">{TIMELINE_EVENTS[activeIdx].location}</span>

          <p className="detail-summary">{TIMELINE_EVENTS[activeIdx].summary}</p>

          <div className="detail-quote-box">
            <span className="quote-mark">“</span>
            <p className="quote-text">{TIMELINE_EVENTS[activeIdx].quote}</p>
          </div>

          <div className="detail-highlights">
            <h5>Key Milestones:</h5>
            <ul>
              {TIMELINE_EVENTS[activeIdx].details.map((detail, dIdx) => (
                <li key={dIdx}>
                  <span className="bullet-point">✦</span>
                  <span className="bullet-text">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

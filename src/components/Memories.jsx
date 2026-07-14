import React, { useState } from 'react';

const MEMORIES_DATA = [
  {
    id: 1,
    image: "/images/memory1.jpg",
    caption: "Trivia Night & Poutine",
    date: "Pub Trivia Night",
    description: "Laughing over plates of poutine at a pub during trivia night. My cheeks literally ache from smiling so much every time we hang out.",
    emoji: "🍟"
  },
  {
    id: 2,
    image: "/images/memory2.jpg",
    caption: "Warm Sofa Cuddles",
    date: "5 Mins After Meeting (Caesars Palace)",
    description: "Holding you close on the sofa only 5 minutes after we first met in Vegas at Caesars Palace. Wrapping my arms around you is my absolute favorite place to be.",
    emoji: "🫂"
  },
  {
    id: 3,
    image: "/images/memory3.jpg",
    caption: "Vegas Promenade Hugs",
    date: "Day 2 of Knowing Each Other",
    description: "Getting lost together on the LINQ Promenade on our second day knowing each other. Out of all the neon lights, you were the only thing I could look at.",
    emoji: "💖"
  },
  {
    id: 5,
    image: "/images/memory5.jpg",
    caption: "The Look of Love",
    date: "Unconditional Magic ⛰️",
    description: "Catching your beautiful smile as we look deep into each other's eyes on the balcony. Looking into your eyes is dangerous—I can never resist kissing you.",
    emoji: "👀"
  }
];

export default function Memories() {
  const [heartsCount, setHeartsCount] = useState({});

  const handleHeartClick = (id, e) => {
    e.stopPropagation();
    setHeartsCount(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div className="memories-section">
      <div className="timeline-header">
        <span className="accent-tag">Our Scrapbook</span>
        <h3>Our Memories</h3>
        <p className="timeline-caption">
          A collection of my absolute favorite photos and moments from our whirlwind adventures
        </p>
      </div>

      <div className="memories-grid">
        {MEMORIES_DATA.map((memory) => (
          <div 
            key={memory.id} 
            className="polaroid-memory-card fade-in"
          >
            <div className="polaroid-tape"></div>
            
            <div className="polaroid-img-wrapper">
              <img src={memory.image} alt={memory.caption} className="polaroid-photo" />
            </div>

            <div className="polaroid-caption-container">
              <span className="polaroid-emoji">{memory.emoji}</span>
              <span className="polaroid-date">{memory.date}</span>
              <h4 className="polaroid-caption">{memory.caption}</h4>
              
              <div className="polaroid-actions-bar">
                <button 
                  className="polaroid-heart-btn"
                  onClick={(e) => handleHeartClick(memory.id, e)}
                  title="Send love!"
                >
                  💝 <span className="heart-count-num">{heartsCount[memory.id] || ''}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

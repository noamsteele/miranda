import React, { useState } from 'react';

const MEMORIES_DATA = [
  {
    id: 1,
    image: "/images/memory1.jpg",
    caption: "Brunch & Smile Hangovers",
    date: "Cozy Brunch Date",
    description: "Laughing over plates of gravy fries and delicious food. My cheeks literally ache from smiling so much every time we hang out.",
    emoji: "🍳"
  },
  {
    id: 2,
    image: "/images/memory2.jpg",
    caption: "Warm Sofa Cuddles",
    date: "A Quiet Moment",
    description: "Holding you close, sharing a red cup, and realizing you are my safe harbor in this crazy world. Wrapping my arms around you is my absolute favorite place to be.",
    emoji: "🫂"
  },
  {
    id: 3,
    image: "/images/memory3.jpg",
    caption: "Vegas Promenade Hugs",
    date: "Desert Romance 🎰",
    description: "Getting lost together in the neon lights of the LINQ Promenade. Out of all the bright lights in Vegas, you were the only thing I could look at.",
    emoji: "💖"
  },
  {
    id: 4,
    image: "/images/memory4.jpg",
    caption: "Toasting to Us",
    date: "Monterrey Gala 🥂",
    description: "Looking sharp in matching black outfits, holding drinks, and toast-making under the beautiful green mountains of Monterrey. You look perfect in every style.",
    emoji: "✨"
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
  const [selectedPhoto, setSelectedPhoto] = useState(null);
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
            onClick={() => setSelectedPhoto(memory)}
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

      {/* Lightbox / Postcard details Modal */}
      {selectedPhoto && (
        <div className="lightbox-overlay fade-in" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>×</button>
            
            <div className="lightbox-inner">
              <div className="lightbox-image-side">
                <img src={selectedPhoto.image} alt={selectedPhoto.caption} className="lightbox-full-img" />
              </div>
              
              <div className="lightbox-text-side">
                <div className="scrapbook-sticker">{selectedPhoto.emoji}</div>
                <span className="lightbox-date">{selectedPhoto.date}</span>
                <h3 className="lightbox-title">{selectedPhoto.caption}</h3>
                
                <p className="lightbox-desc">
                  "{selectedPhoto.description}"
                </p>

                <div className="lightbox-footer-notes">
                  <p>Memories of Us</p>
                  <p className="note-sig">Forever &amp; Always ♡</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

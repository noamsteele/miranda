import React, { useState } from 'react';

const FILES_DATA = [
  {
    tag: "The Cheese Dilemma",
    category: "Habits",
    description: "She has a chaotic relationship with dairy… lactose intolerant, but her love for cheese is stronger than her self-preservation.",
    icon: "🧀"
  },
  {
    tag: "The Red Alert",
    category: "Romantic",
    description: "She still hasn’t figured out how to handle a compliment; every time I call her pretty, she turns a shade of red that proves she has no idea how true it is.",
    icon: "😳"
  },
  {
    tag: "The Bizarre Mirror",
    category: "Comedy",
    description: "We have the most bizarre things in common; from our all-black wardrobes to the struggle of having a massive love for food but very weak stomachs to handle it.",
    icon: "🖤"
  },
  {
    tag: "The Mixing Pot",
    category: "Habits",
    description: "She embodies the absolute best parts of the three countries she’s lived in (Mexico, USA, Netherlands) all in one person.",
    icon: "🗺️"
  },
  {
    tag: "The Mariana Mom Factor",
    category: "Comedy",
    description: "She’s officially terrified of Mariana’s mom (it’s a healthy, respectful type of fear).",
    icon: "🤫"
  },
  {
    tag: "The Eye Contact Rule",
    category: "Romantic",
    description: "Looking into her eyes is a dangerous game; she has a kissing instinct that’s impossible to resist.",
    icon: "👀"
  },
  {
    tag: "The Kyoto Connection",
    category: "Adventure",
    description: "Out of all the places she’s traveled, her favourite part of Japan was Kyoto (don’t feed her too much sake haha).",
    icon: "⛩️"
  },
  {
    tag: "The Mind Reader",
    category: "Romantic",
    description: "She’s incredibly perspicacious; she picks up on all the little things, like exactly when I’m overthinking or hesitating to say something.",
    icon: "🧠"
  },
  {
    tag: "The Hair Debate",
    category: "Habits",
    description: "She misses her long hair, but hasn’t realized yet that she’s the only person on earth who looks perfect in every style she’s tried.",
    icon: "💇‍♀️"
  },
  {
    tag: "The Smile Hangover",
    category: "Romantic",
    description: "My face literally aches after every FaceTime or date because she doesn’t give my cheeks a second of rest from smiling.",
    icon: "😊"
  },
  {
    tag: "The Chef",
    category: "Cooking",
    description: "She can cook a five-star meal over FaceTime and is still content with eggs and tortillas haha",
    icon: "🍳"
  },
  {
    tag: "The Intoxicant",
    category: "Romantic",
    description: "She smells so good it’s actually dangerous; it’s the kind of scent that makes it impossible to focus on anything else when she’s close (makes me melt).",
    icon: "🌸"
  },
  {
    tag: "The Yap-A-Thon",
    category: "Comedy",
    description: "We both love to yap, which means I never get bored talking to her, we can go for hours and never run out of things to say.",
    icon: "🗣️"
  },
  {
    tag: "The Passenger Princess",
    category: "Comedy",
    description: "She constantly mentions how she's a bad driver, but she still won't even give me the prospect of driving her car when I get to Mexico",
    icon: "🚗"
  },
  {
    tag: "The Butterflies",
    category: "Romantic",
    description: "“She’s beautiful, she looks kind, she probably (definitely) gives me butterflies...” 🎵 🎶",
    icon: "🎵"
  },
  {
    tag: "The Secret Message",
    category: "Romantic",
    description: "There’s a specific way she squeezes me during a hug; it’s like she’s secretly whispering how much she likes me without saying a word.",
    icon: "🫂"
  },
  {
    tag: "The Cat Mom",
    category: "Comedy",
    description: "She’s definitely on the fast track to becoming a crazy cat lady, but seeing how much her cats absolutely adore her is actually the sweetest thing.",
    icon: "🐈"
  },
  {
    tag: "The Wellington Moment",
    category: "Cooking",
    description: "I’ve always wanted to try Ramsay’s Wellington, and getting to share that with her warmed my heart… especially since she’s such a foodie",
    icon: "🍷"
  },
  {
    tag: "The Spontaneous Spark",
    category: "Adventure",
    description: "She has this way of making a last-minute flight to Monterrey feel like the most logical thing in the world.",
    icon: "✈️"
  },
  {
    tag: "The Be-All-End-All",
    category: "Romantic",
    description: "She makes me happy.",
    icon: "💖"
  }
];

export default function MirandaFiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Romantic", "Comedy", "Cooking", "Habits", "Adventure"];

  const filteredFiles = FILES_DATA.filter(file => {
    const matchesSearch = file.tag.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          file.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="files-section">
      <div className="files-header">
        <span className="accent-tag">The Keep Archive</span>
        <h3>ABC’s of Miranda</h3>
        <p className="files-caption">A running log of quirks, connections, and things I find cute about her</p>
      </div>

      {/* Filter and Search Box */}
      <div className="files-controls">
        <input 
          type="text" 
          placeholder="Search observations... (e.g. cheese, recipe)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="category-tabs">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="files-grid">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file, idx) => (
            <div key={idx} className="file-card fade-in">
              <div className="file-card-inner">
                <span className="file-emoji">{file.icon}</span>
                <span className="file-card-cat">{file.category}</span>
                <h4 className="file-card-title">{file.tag}</h4>
                <p className="file-card-desc">"{file.description}"</p>
              </div>
              <div className="file-card-tape"></div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No file matches your search. Try adjusting the search term or category!</p>
          </div>
        )}
      </div>
    </div>
  );
}

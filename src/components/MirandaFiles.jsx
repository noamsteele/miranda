import React, { useState } from 'react';

const FILES_DATA = [
  {
    tag: "The Cheese Dilemma",
    category: "Habits",
    description: "She’s lactose intolerant but refuses to live a life without cheese—I love that her heart (and her stomach) always wins over logic.",
    icon: "🧀"
  },
  {
    tag: "The Mariana Factor",
    category: "Comedy",
    description: "She has this hilarious, deep-rooted fear of Mariana’s mom. It’s easily my favorite thing to tease her about.",
    icon: "🤫"
  },
  {
    tag: "The Instinct",
    category: "Romantic",
    description: "There’s a certain way she looks at me that makes it impossible to think about anything else. It’s like she has a built-in instinct for exactly when I want to kiss her.",
    icon: "👀"
  },
  {
    tag: "The Hair Debate",
    category: "Habits",
    description: "She spends a lot of time missing her long hair, but I don't think she realizes that she’s the only person who can pull off every single look perfectly.",
    icon: "💇‍♀️"
  },
  {
    tag: "The Soundtrack",
    category: "Romantic",
    description: "She really is everything from that song ('Hope Ur OK' by Olivia Rodrigo)—pretty, kind, and the only person who can give me butterflies just by showing up on my screen.",
    icon: "🎵"
  },
  {
    tag: "The Chef",
    category: "Cooking",
    description: "Watching her run a kitchen over FaceTime is my new favorite show. She makes 'Caldo de Pollo' cubes look like magic.",
    icon: "👩‍🍳"
  },
  {
    tag: "The Legend of Monterrey",
    category: "Romantic",
    description: "She thinks I’m 'brave' for booking a flight to Mexico on a whim, but honestly, I think I’m just smart for not letting her get away.",
    icon: "🗺️"
  },
  {
    tag: "The Secret Message",
    category: "Romantic",
    description: "There’s a specific way she squeezes me during a hug—it’s like she’s secretly whispering how much she likes me without saying a single word.",
    icon: "🫂"
  },
  {
    tag: "The Smile Hangover",
    category: "Romantic",
    description: "My face literally aches after every FaceTime or date because she doesn't give my cheeks a second of rest from smiling.",
    icon: "😊"
  },
  {
    tag: "The Red Alert",
    category: "Romantic",
    description: "She still hasn't figured out how to handle a compliment; every time I call her pretty, she turns a shade of red that proves she has no idea how true it is.",
    icon: "😳"
  },
  {
    tag: "The Multicultural Blend",
    category: "Habits",
    description: "She embodies the absolute best parts of the three countries she’s lived in—the USA, Mexico, and the Netherlands—all in one person.",
    icon: "🗺️"
  },
  {
    tag: "The Bizarre Mirror",
    category: "Comedy",
    description: "We have the most bizarre things in common—from our all-black wardrobes to the struggle of having a massive love for food but very weak stomachs to handle it.",
    icon: "🖤"
  },
  {
    tag: "The Taco Date",
    category: "Cooking",
    description: "Our first FaceTime cooking date was the most wholesome night; we spent the whole time making tacos and just being cute together.",
    icon: "🌮"
  },
  {
    tag: "The Kyoto Connection",
    category: "Adventure",
    description: "Out of all cluster of places she's traveled, her favorite part of Japan was Kyoto. The postcard from 2023 was waiting for her all along.",
    icon: "⛩️"
  },
  {
    tag: "The Cat Whisperer",
    category: "Comedy",
    description: "She’s definitely on the fast track to becoming a crazy cat lady, but seeing how much her cats adore her is the sweetest thing. They follow her everywhere and lay on her whenever she sits.",
    icon: "🐈"
  },
  {
    tag: "The Hell's Kitchen Date",
    category: "Cooking",
    description: "I’ve always wanted to try Gordon Ramsay’s Beef Wellington, and getting to share that with her warmed my heart—especially since she spotted the one missing menu item at Caesars Palace.",
    icon: "🍷"
  },
  {
    tag: "The Passenger Princess",
    category: "Comedy",
    description: "She constantly mentions how she's a bad driver, but she still won't even give me the prospect of driving her car when I get to Mexico.",
    icon: "🚗"
  },
  {
    tag: "The Signature Snack",
    category: "Cooking",
    description: "She is so Mexican that her idea of a 'quick snack' is whipping up eggs and tortillas.",
    icon: "🍳"
  },
  {
    tag: "The Yap-A-Thon",
    category: "Comedy",
    description: "We both love to yap, which means I never get bored talking to her—we can go for hours and never run out of things to say.",
    icon: "🗣️"
  },
  {
    tag: "The Mind Reader",
    category: "Romantic",
    description: "She’s incredibly perspicacious; she picks up on all the little things, like exactly when I’m overthinking or hesitating to say something.",
    icon: "🧠"
  },
  {
    tag: "The Intoxicant",
    category: "Romantic",
    description: "She smells so good it’s actually dangerous; it’s the kind of scent that makes it impossible to focus on anything else when she’s close.",
    icon: "🌸"
  },
  {
    tag: "The Pajama Professional",
    category: "Habits",
    description: "She takes her downtime very seriously; she has an entire collection of pajamas and refuses to settle for anything less than a full, dedicated set.",
    icon: "🛌"
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
        <h3>The Miranda Files</h3>
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

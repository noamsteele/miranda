import React, { useState, useEffect, useRef } from 'react';

// Grid Definition: 13 rows (0-12) x 18 columns (0-17)
const GRID_ROWS = 13;
const GRID_COLS = 18;

const CLUES = {
  across: [
    { id: 3, number: "3", text: "Our wholesome first FaceTime cooking date food", length: 5, cells: [[3,8], [3,9], [3,10], [3,11], [3,12]] },
    { id: 5, number: "5", text: "What I tell you everday", length: 16, cells: [[5,0], [5,1], [5,2], [5,3], [5,4], [5,5], [5,6], [5,7], [5,8], [5,9], [5,10], [5,11], [5,12], [5,13], [5,14], [5,15]] },
    { id: 9, number: "9", text: "The European city where we are moving together next year", length: 9, cells: [[9,9], [9,10], [9,11], [9,12], [9,13], [9,14], [9,15], [9,16], [9,17]] },
    { id: 10, number: "10", text: "How you laugh", length: 4, cells: [[11,10], [11,11], [11,12], [11,13]] }
  ],
  down: [
    { id: 1, number: "1", text: "How i feel about you", length: 6, cells: [[0,14], [1,14], [2,14], [3,14], [4,14], [5,14]] },
    { id: 2, number: "2", text: "What we saw on our night at blueberry docks", length: 12, cells: [[1,11], [2,11], [3,11], [4,11], [5,11], [6,11], [7,11], [8,11], [9,11], [10,11], [11,11], [12,11]] },
    { id: 4, number: "4", text: "Your favourite food", length: 5, cells: [[4,2], [5,2], [6,2], [7,2], [8,2]] },
    { id: 6, number: "6", text: "How I wake you in the morning", length: 6, cells: [[5,6], [6,6], [7,6], [8,6], [9,6], [10,6]] },
    { id: 7, number: "7", text: "Where our whirlwind story spontaneously began in April 2026", length: 5, cells: [[8,13], [9,13], [10,13], [11,13], [12,13]] },
    { id: 8, number: "8", text: "How I laugh", length: 4, cells: [[8,16], [9,16], [10,16], [11,16]] }
  ]
};

const CELL_DEFAULTS = {
  // Clue 1: ILOVEU
  '0,14': { letter: 'I', numLabel: '1' },
  '1,14': { letter: 'L', numLabel: '' },
  '2,14': { letter: 'O', numLabel: '' },
  '3,14': { letter: 'V', numLabel: '' },
  '4,14': { letter: 'E', numLabel: '' },
  '5,14': { letter: 'U', numLabel: '' },

  // Clue 2: SHOOTINGSTAR
  '1,11': { letter: 'S', numLabel: '2' },
  '2,11': { letter: 'H', numLabel: '' },
  '3,11': { letter: 'O', numLabel: '' },
  '4,11': { letter: 'O', numLabel: '' },
  '5,11': { letter: 'T', numLabel: '' },
  '6,11': { letter: 'I', numLabel: '' },
  '7,11': { letter: 'N', numLabel: '' },
  '8,11': { letter: 'G', numLabel: '' },
  '9,11': { letter: 'S', numLabel: '' },
  '10,11': { letter: 'T', numLabel: '' },
  '11,11': { letter: 'A', numLabel: '' },
  '12,11': { letter: 'R', numLabel: '' },

  // Clue 3: TACOS
  '3,8': { letter: 'T', numLabel: '3' },
  '3,9': { letter: 'A', numLabel: '' },
  '3,10': { letter: 'C', numLabel: '' },
  '3,12': { letter: 'S', numLabel: '' },

  // Clue 4: SUSHI
  '4,2': { letter: 'S', numLabel: '4' },
  '5,2': { letter: 'U', numLabel: '' },
  '6,2': { letter: 'S', numLabel: '' },
  '7,2': { letter: 'H', numLabel: '' },
  '8,2': { letter: 'I', numLabel: '' },

  // Clue 5: YOULOOKBEAUTIFUL
  '5,0': { letter: 'Y', numLabel: '5' },
  '5,1': { letter: 'O', numLabel: '' },
  '5,3': { letter: 'L', numLabel: '' },
  '5,4': { letter: 'O', numLabel: '' },
  '5,5': { letter: 'O', numLabel: '' },
  '5,7': { letter: 'B', numLabel: '' },
  '5,8': { letter: 'E', numLabel: '' },
  '5,9': { letter: 'A', numLabel: '' },
  '5,10': { letter: 'U', numLabel: '' },
  '5,12': { letter: 'I', numLabel: '' },
  '5,13': { letter: 'F', numLabel: '' },
  '5,15': { letter: 'L', numLabel: '' },

  // Clue 6: KISSES
  '5,6': { letter: 'K', numLabel: '6' },
  '6,6': { letter: 'I', numLabel: '' },
  '7,6': { letter: 'S', numLabel: '' },
  '8,6': { letter: 'S', numLabel: '' },
  '9,6': { letter: 'E', numLabel: '' },
  '10,6': { letter: 'S', numLabel: '' },

  // Clue 7: VEGAS
  '8,13': { letter: 'V', numLabel: '7' },
  '9,13': { letter: 'E', numLabel: '' },
  '10,13': { letter: 'G', numLabel: '' },
  '11,13': { letter: 'A', numLabel: '' },
  '12,13': { letter: 'S', numLabel: '' },

  // Clue 8: HAHA
  '8,16': { letter: 'H', numLabel: '8' },
  '9,16': { letter: 'A', numLabel: '' },
  '10,16': { letter: 'H', numLabel: '' },
  '11,16': { letter: 'A', numLabel: '' },

  // Clue 9: AMSTERDAM
  '9,9': { letter: 'A', numLabel: '9' },
  '9,10': { letter: 'M', numLabel: '' },
  '9,12': { letter: 'T', numLabel: '' },
  '9,14': { letter: 'R', numLabel: '' },
  '9,15': { letter: 'D', numLabel: '' },
  '9,17': { letter: 'M', numLabel: '' },

  // Clue 10: JAJA
  '11,10': { letter: 'J', numLabel: '10' },
  '11,12': { letter: 'J', numLabel: '' }
};

export default function Crossword() {
  const [gridValues, setGridValues] = useState({});
  const [clickedClue, setClickedClue] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showError, setShowError] = useState(false);
  const inputRefs = useRef({});

  // Auto-focus helper
  const handleInputChange = (r, c, val) => {
    const key = `${r},${c}`;
    const cleaned = val.toUpperCase().slice(-1); // Only take the last character typed

    if (!cleaned) {
      setGridValues(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      return;
    }

    setGridValues(prev => ({
      ...prev,
      [key]: cleaned
    }));

    // Find if we are currently moving in a direction and shift focus
    if (clickedClue) {
      const cells = clickedClue.cells;
      const currentIdx = cells.findIndex(([cr, cc]) => cr === r && cc === c);
      if (currentIdx !== -1 && currentIdx < cells.length - 1) {
        const [nextR, nextC] = cells[currentIdx + 1];
        const nextKey = `${nextR},${nextC}`;
        if (inputRefs.current[nextKey]) {
          inputRefs.current[nextKey].focus();
        }
      }
    }
  };

  const handleKeyDown = (r, c, e) => {
    const key = `${r},${c}`;
    if (e.key === 'Backspace' && !gridValues[key]) {
      // Find previous cell in highlighted clue
      if (clickedClue) {
        const cells = clickedClue.cells;
        const currentIdx = cells.findIndex(([cr, cc]) => cr === r && cc === c);
        if (currentIdx > 0) {
          const [prevR, prevC] = cells[currentIdx - 1];
          const prevKey = `${prevR},${prevC}`;
          if (inputRefs.current[prevKey]) {
            inputRefs.current[prevKey].focus();
          }
        }
      }
    }
  };

  const handleCellClick = (r, c) => {
    // Find clues containing this cell
    const foundAcross = CLUES.across.find(clue => clue.cells.some(([cr, cc]) => cr === r && cc === c));
    const foundDown = CLUES.down.find(clue => clue.cells.some(([cr, cc]) => cr === r && cc === c));

    if (foundAcross && clickedClue?.id !== foundAcross.id) {
      setClickedClue(foundAcross);
    } else if (foundDown) {
      setClickedClue(foundDown);
    }
  };

  const checkSolution = () => {
    let allCorrect = true;
    
    // Check if every crossword cell matches defaults
    Object.keys(CELL_DEFAULTS).forEach(key => {
      const playerLetter = (gridValues[key] || '').trim().toUpperCase();
      const correctLetter = CELL_DEFAULTS[key].letter.toUpperCase();
      
      if (playerLetter !== correctLetter) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      setIsSolved(true);
      setShowError(false);
    } else {
      setShowError(true);
      setIsSolved(false);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const autofillGridForTesting = () => {
    const values = {};
    Object.keys(CELL_DEFAULTS).forEach(key => {
      values[key] = CELL_DEFAULTS[key].letter;
    });
    setGridValues(values);
  };

  const activeCells = clickedClue ? clickedClue.cells.map(([r, c]) => `${r},${c}`) : [];

  return (
    <div className="crossword-section">
      <div className="crossword-header">
        <span className="accent-tag">Wholesome Interactions</span>
        <h3>The FaceTime Crossword</h3>
        <p className="crossword-caption">Solve our personalized crossword to unlock the Kyoto postcard message! 🗝️</p>
      </div>

      <div className="crossword-layout">
        
        {/* The Grid */}
        <div className="grid-container">
          <div 
            className="crossword-grid"
            style={{
              gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
              gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`
            }}
          >
            {Array.from({ length: GRID_ROWS }).map((_, r) => (
              Array.from({ length: GRID_COLS }).map((_, c) => {
                const cellKey = `${r},${c}`;
                const cellInfo = CELL_DEFAULTS[cellKey];

                if (!cellInfo) {
                  return <div key={cellKey} className="crossword-cell block"></div>;
                }

                const isActive = activeCells.includes(cellKey);
                const isClueStart = cellInfo.numLabel !== '';

                return (
                  <div 
                    key={cellKey} 
                    className={`crossword-cell letter-cell ${isActive ? 'active-cell' : ''}`}
                    onClick={() => handleCellClick(r, c)}
                  >
                    {isClueStart && <span className="cell-num">{cellInfo.numLabel}</span>}
                    <input
                      ref={el => inputRefs.current[cellKey] = el}
                      type="text"
                      className="cell-input"
                      maxLength={1}
                      value={gridValues[cellKey] || ''}
                      onChange={e => handleInputChange(r, c, e.target.value)}
                      onKeyDown={e => handleKeyDown(r, c, e)}
                      autoComplete="off"
                    />
                  </div>
                );
              })
            ))}
          </div>

          <div className="grid-controls">
            <button className="check-btn" onClick={checkSolution}>Check Answers</button>
            <button className="clear-btn" onClick={() => setGridValues({})}>Reset Board</button>
            <button className="cheat-btn" onClick={autofillGridForTesting}>Reveal Answers</button>
          </div>
          
          {showError && (
            <div className="puzzle-bubble error-bubble animate-bounce">
              ❌ Some letters are incorrect. Give it another try, you got this!
            </div>
          )}
        </div>

        {/* The Clues */}
        <div className="clues-container">
          <div className="clues-group">
            <h4>Horizontal / Across</h4>
            <ul>
              {CLUES.across.map(clue => (
                <li 
                  key={clue.id}
                  className={`clue-item ${clickedClue?.id === clue.id ? 'active-clue' : ''}`}
                  onClick={() => setClickedClue(clue)}
                >
                  <span className="clue-num-tag">{clue.number}</span>
                  <span className="clue-desc-text">{clue.text} ({clue.length})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="clues-group">
            <h4>Vertical / Down</h4>
            <ul>
              {CLUES.down.map(clue => (
                <li 
                  key={clue.id}
                  className={`clue-item ${clickedClue?.id === clue.id ? 'active-clue' : ''}`}
                  onClick={() => setClickedClue(clue)}
                >
                  <span className="clue-num-tag">{clue.number}</span>
                  <span className="clue-desc-text">{clue.text} ({clue.length})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Secret Message Overlay */}
      {isSolved && (
        <div className="secret-postcard-overlay fade-in">
          <div className="secret-postcard">
            <div className="postcard-header">
              <span className="stamp-box"> Kyoto 2023 ⛩️</span>
              <h4>Kyoto Postcard Note</h4>
              <p className="card-dedication">To Miranda, with absolute love 🤍</p>
            </div>
            
            <div className="postcard-body">
              <p>
                "I picked this up in Kyoto in 2023, and I finally realize why I held onto it for so long—it was just waiting for you.
              </p>
              <p>
                Coming to Monterrey was the best decision I’ve ever made. I usually pride myself on my logic, but the smartest thing I’ve ever done was listen to my gut and get on that flight. Thank you for inviting me into your world.
              </p>
              <p>
                I am so happy the universe put us in the same place in Vegas. I’ve fallen in love with every part of who you are—your mind, your energy, and the way you see the world. Finding someone who matches my intensity is something I never thought possible, but now that I’ve found you, I’m never letting go.
              </p>
              <p className="postcard-signature">
                I love you, Miranda. 🤍
              </p>
            </div>
            
            <div className="postcard-actions">
              <button className="close-overlay-btn" onClick={() => setIsSolved(false)}>Close Postcard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

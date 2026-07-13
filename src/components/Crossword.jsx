import React, { useState, useEffect, useRef } from 'react';

// Grid Definition: 11 rows (0-10) x 8 columns (0-7)
const GRID_ROWS = 11;
const GRID_COLS = 8;

const CLUES = {
  across: [
    { id: 2, number: "2", text: "Where our whirlwind story spontaneously began in April 2026", length: 5, cells: [[2,0], [2,1], [2,2], [2,3], [2,4]] },
    { id: 5, number: "5", text: "Our wholesome first FaceTime cooking date food", length: 5, cells: [[5,3], [5,4], [5,5], [5,6], [5,7]] }
  ],
  down: [
    { id: 1, number: "1", text: "Mexican slang for the 'guts' it took you to book that flight ('puros...')", length: 6, cells: [[0,1], [1,1], [2,1], [3,1], [4,1], [5,1]] },
    { id: 3, number: "3", text: "The European city where we are moving in January 2027", length: 9, cells: [[2,3], [3,3], [4,3], [5,3], [6,3], [7,3], [8,3], [9,3], [10,3]] },
    { id: 4, number: "4", text: "Her absolute favorite city in Japan (the postcard was waiting)", length: 5, cells: [[3,6], [4,6], [5,6], [6,6], [7,6]] }
  ]
};

const CELL_DEFAULTS = {
  // Row 0
  '0,1': { letter: 'H', numLabel: '1' },
  // Row 1
  '1,1': { letter: 'U', numLabel: '' },
  // Row 2
  '2,0': { letter: 'V', numLabel: '2' },
  '2,1': { letter: 'E', numLabel: '' }, // Intersects HUEVOS
  '2,2': { letter: 'G', numLabel: '' },
  '2,3': { letter: 'A', numLabel: '3' }, // Intersects AMSTERDAM
  '2,4': { letter: 'S', numLabel: '' },
  // Row 3
  '3,1': { letter: 'V', numLabel: '' },
  '3,3': { letter: 'M', numLabel: '' },
  '3,6': { letter: 'K', numLabel: '4' },
  // Row 4
  '4,1': { letter: 'O', numLabel: '' },
  '4,3': { letter: 'S', numLabel: '' },
  '4,6': { letter: 'Y', numLabel: '' },
  // Row 5
  '5,1': { letter: 'S', numLabel: '' },
  '5,3': { letter: 'T', numLabel: '5' }, // Intersects TACOS / AMSTERDAM
  '5,4': { letter: 'A', numLabel: '' },
  '5,5': { letter: 'C', numLabel: '' },
  '5,6': { letter: 'O', numLabel: '' }, // Intersects KYOTO / TACOS
  '5,7': { letter: 'S', numLabel: '' },
  // Row 6
  '6,3': { letter: 'E', numLabel: '' },
  '6,6': { letter: 'T', numLabel: '' },
  // Row 7
  '7,3': { letter: 'R', numLabel: '' },
  '7,6': { letter: 'O', numLabel: '' },
  // Row 8
  '8,3': { letter: 'D', numLabel: '' },
  // Row 9
  '9,3': { letter: 'A', numLabel: '' },
  // Row 10
  '10,3': { letter: 'M', numLabel: '' }
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

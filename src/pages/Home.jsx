// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../lib/supabaseClient';
import { useWord } from '../context/WordContext.jsx';
import '../styles/Home.css';

function Home() {
  const [totalPlayers, setTotalPlayers] = useState(3);
  const [numChosen, setNumChosen] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { word, startNewGame } = useWord();
  // Load the word when the component mounts
  useEffect(() => {
    const loadWord = async () => {
      if (!word) {  // Only fetch if we don't have a word
        setIsLoading(true);
        try {
          const gameWords = await fetchData('random_word');
          if (gameWords?.length) {
            startNewGame(gameWords[0].word, totalPlayers, numChosen);
          }
        } catch (error) {
          console.error('Failed to fetch word:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadWord();
  }, []); // Empty dependency array means this runs once on mount
  const handleStartGame = async () => {
    setIsLoading(true);
    try {
      const gameWords = await fetchData('random_word');
      if (gameWords?.length) {
        startNewGame(gameWords[0].word, totalPlayers, numChosen);
      }
    } catch (error) {
      console.error('Failed to fetch word:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="home">
      <h1>Welcome to the Game</h1>
      <div className="game-settings">
        <div>
          <label>
            Total Players: 
            <input
              type="number"
              min="1"
              value={totalPlayers}
              onChange={(e) => {
                const val = Math.max(1, +e.target.value || 1);
                setTotalPlayers(val);
                setNumChosen(prev => Math.min(prev, val));
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Number of Chosen Ones: 
            <input
              type="number"
              min="1"
              max={totalPlayers}
              value={numChosen}
              onChange={(e) => {
                const val = Math.min(totalPlayers, Math.max(1, +e.target.value || 1));
                setNumChosen(val);
              }}
            />
          </label>
        </div>
        <button 
          onClick={handleStartGame}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Start Game'}
        </button>
      </div>
      
      <div className="player-links">
        {Array.from({ length: totalPlayers }, (_, i) => (
          <Link
            key={i + 1}
            to={`/player/${i + 1}`}
            className="player-button"
            target="_blank"
          >
            Open Player {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
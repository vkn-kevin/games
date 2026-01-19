// src/context/WordContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'gameState';

const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    // Load state from localStorage if available
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      word: null,
      chosenPlayers: [],
      totalPlayers: 3
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Function to start a new game
  const startNewGame = (newWord, total, numChosen) => {
    // Generate array of all player numbers
    const allPlayers = Array.from({ length: total }, (_, i) => i + 1);
    
    // Randomly select 'numChosen' players
    const shuffled = [...allPlayers].sort(() => 0.5 - Math.random());
    const newChosenPlayers = shuffled.slice(0, numChosen);

    setState(prev => ({
      ...prev,
      word: newWord,
      totalPlayers: total,
      chosenPlayers: newChosenPlayers
    }));
  };

  // Check if a player is chosen
  const isChosen = (playerNumber) => {
    return state.chosenPlayers.includes(Number(playerNumber));
  };

  return (
    <WordContext.Provider value={{ 
      word: state.word,
      totalPlayers: state.totalPlayers,
      chosenPlayers: state.chosenPlayers,
      startNewGame,
      isChosen
    }}>
      {children}
    </WordContext.Provider>
  );
};

export const useWord = () => useContext(WordContext);
// src/pages/Player.jsx
import { useParams } from 'react-router-dom';
import { useWord } from '../context/WordContext.jsx';
import '../styles/Home.css';

function Player() {
  const { playerNumber } = useParams();
  const { word, isChosen } = useWord();

  return (
    <div className="player-page">
      <h1>Player {playerNumber}'s Screen</h1>
      <div className="text-box">
        {!word ? (
          <p>Waiting for the game to start...</p>
        ) : isChosen(playerNumber) ? (
          <div className="chosen-one">
            <h2>YOU ARE THE CHOSEN ONE</h2>
            <p>Your mission is to figure out the secret word!</p>
          </div>
        ) : (
          <div className="word-display">
            <h2>The word is:</h2>
            <div className="word">{word}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Player;
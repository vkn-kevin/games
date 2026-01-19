// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WordProvider } from './context/WordContext';
import Home from './pages/Home';
import Player from './pages/Player';
import './styles/App.css';

function App() {
  return (
    <WordProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:playerNumber" element={<Player />} />
        </Routes>
      </Router>
    </WordProvider>
  );
}

export default App;
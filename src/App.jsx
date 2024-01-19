import { useState } from 'react';

import './App.css';
import Game from './components/Game';

function App() {
  // this changes the key of the game component to force re-render on gameover. It passes the reset function as a prop to game
  const [gameKey, setGameKey] = useState(0);
  const resetGame = () => {
    setGameKey((prevKey) => prevKey + 1);
  };

  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <header>
        <h1>Pokemon Memory Game</h1>
      </header>
      <Game
        key={gameKey}
        onGameOver={resetGame}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
    </>
  );
}

export default App;

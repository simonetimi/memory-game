import { useState } from 'react';

import './App.css';
import Score from './components/Score';
import Game from './components/Game';

function App() {
  // this changes the key of the game component to force re-render on gameover. It passes the reset function as a prop to game
  const { gameKey, setGameKey } = useState(0);
  const resetGame = () => {
    setGameKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <header>
        <h1>Pokemon Memory Game</h1>
      </header>
      <Score />
      <Game key={gameKey} onGameOver={resetGame} />
    </>
  );
}

export default App;

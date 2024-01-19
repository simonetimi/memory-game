import './App.css';
import Score from './components/Score';
import Game from './components/Game';

function App() {
  return (
    <>
      <header>
        <h1>Pokemon Memory Game</h1>
      </header>
      <Score />
      <Game />
    </>
  );
}

export default App;

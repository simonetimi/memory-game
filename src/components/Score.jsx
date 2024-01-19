import '../styles/Score.css';
import { useState } from 'react';

function Score() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return (
    <section className="score">
      <p>Current score: {currentScore}</p>
      <p>Best score: {bestScore}</p>
    </section>
  );
}

export default Score;

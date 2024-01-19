/* eslint-disable react/prop-types */
import '../styles/Score.css';

function Score({ currentScore, bestScore }) {
  return (
    <section className="score">
      <p>Current score: {currentScore}</p>
      <p>Best score: {bestScore}</p>
    </section>
  );
}

export default Score;

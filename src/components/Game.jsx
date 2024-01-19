/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import '../styles/Game.css';

import Score from './Score';
import useFetchData from '../hooks/data';

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

function Game({ onGameOver, bestScore, setBestScore }) {
  const { pokeData, fetchError } = useFetchData();
  const [localPokeData, setLocalPokeData] = useState(null);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    if (pokeData) {
      setLocalPokeData(pokeData);
    }
  }, [pokeData]);
  if (fetchError) {
    return <section className="card-container loading">Error: {fetchError}</section>;
  }
  if (!pokeData || pokeData.length === 0) {
    return <section className="card-container loading">Loading</section>;
  }

  function handleOnClick(pokemon) {
    const updatedClickedCards = new Set(clickedCards);
    if (updatedClickedCards.has(pokemon)) {
      setBestScore(Math.max(currentScore, bestScore));
      setCurrentScore(0);
      setClickedCards(new Set());
      onGameOver();
      return;
    }
    updatedClickedCards.add(pokemon);
    setClickedCards(updatedClickedCards);
    setCurrentScore(currentScore + 1);
    if (updatedClickedCards.size === 10) {
      // win game logic TO COMPLETE
      return;
    }
    // shuffle logic
    setLocalPokeData(shuffle([...localPokeData]));
  }

  return (
    <>
      <Score currentScore={currentScore} bestScore={bestScore} />
      <section className="card-container">
        {localPokeData.map((pokemon) => (
          <button
            type="button"
            key={pokemon.name}
            className="card"
            onClick={() => handleOnClick(pokemon.name)}
          >
            <img src={pokemon.imgUrl} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </button>
        ))}
      </section>
    </>
  );
}

export default Game;

/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import '../styles/Game.css';

import Score from './Score';
import Modal from './Modal';
import useFetchData from '../hooks/data';

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

function Game({ onGameOver, bestScore, setBestScore }) {
  // fetched data and cards
  const { pokeData, fetchError } = useFetchData();
  const [localPokeData, setLocalPokeData] = useState(null);
  const [clickedCards, setClickedCards] = useState(new Set());
  // score
  const [currentScore, setCurrentScore] = useState(0);
  // modal
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isWon, setIsWon] = useState(null);

  // functions to manage modal
  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
    // also sets gameover
    onGameOver();
  };

  useEffect(() => {
    if (pokeData) {
      setLocalPokeData(pokeData);
    }
  }, [pokeData]);

  // game loop login
  function handleOnClick(pokemon) {
    const updatedClickedCards = new Set(clickedCards);
    if (updatedClickedCards.has(pokemon)) {
      setBestScore(Math.max(currentScore, bestScore));
      setCurrentScore(0);
      setClickedCards(new Set());
      // set isWon to false, pass it to the modal and opens it
      setIsWon(false);
      openDialog();
      return;
    }
    updatedClickedCards.add(pokemon);
    setClickedCards(updatedClickedCards);
    setCurrentScore(currentScore + 1);
    if (updatedClickedCards.size === 10) {
      setBestScore(currentScore);
      // set isWon to true, pass it to the modal and opens it
      setIsWon(true);
      openDialog();

      return;
    }
    // shuffle logic
    setLocalPokeData(shuffle([...localPokeData]));
  }

  // for fetching problems or while loading
  if (fetchError) {
    return <section className="card-container loading">Error: {fetchError}</section>;
  }
  if (!pokeData || pokeData.length === 0) {
    return <section className="card-container loading">Loading</section>;
  }

  return (
    <>
      <Score currentScore={currentScore} bestScore={bestScore} />
      <section className="card-container">
        <Modal isOpen={dialogOpen} isWon={isWon} functionOnClose={closeDialog} />
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

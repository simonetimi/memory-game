/* eslint-disable react/prop-types */
import '../styles/Game.css';

import useFetchData from '../hooks/data';

function Game({ gameover }) {
  const { pokeData, fetchError } = useFetchData();
  if (fetchError) {
    return <section className="card-container loading">Error: {fetchError}</section>;
  }
  if (!pokeData || pokeData.length === 0) {
    return <section className="card-container loading">Loading</section>;
  }

  return (
    <section className="card-container">
      {pokeData.map((pokemon) => (
        <div key={pokemon.name} className="card">
          <img src={pokemon.imgUrl} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </section>
  );
}

export default Game;

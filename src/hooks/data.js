import { useState, useEffect } from 'react';

const initialToUpperCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const useFetchData = () => {
  const [pokeData, setPokeData] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchPokeData = async () => {
      // generate a set of 10 unique IDs
      const generateRandomId = () => Math.floor(Math.random() * 1000 + 1);
      const usedIds = new Set();
      while (usedIds.size < 10) {
        let randomId = generateRandomId();
        while (usedIds.has(randomId)) {
          randomId = generateRandomId();
        }
        usedIds.add(randomId);
      }

      // create arrays of urls with 10 unique IDs
      const urlsToFetch = [];
      usedIds.forEach((id) => {
        urlsToFetch.push(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      });

      // function fetch poke names and pictures for every unique ID and pushed them in
      async function fetchDataWithRetry(url, attempts = 0) {
        try {
          const response = await fetch(url, { mode: 'cors' });
          const result = await response.json();
          const filteredResult = {
            name: initialToUpperCase(result.name),
            imgUrl: result.sprites.other['official-artwork'].front_default,
          };
          return filteredResult;
        } catch (error) {
          if (attempts < 3) {
            return fetchDataWithRetry(url, attempts + 1);
          }
          setFetchError(`Error: ${error}. Couldn't fetch url: ${url}.`);
          return null;
        }
      }

      // calls that function for every item in the URLs array and returns an array of promises
      const fetchPromises = urlsToFetch.map((url) => fetchDataWithRetry(url));

      // resolves all those promises and writes that data with useState
      try {
        const pokeResults = await Promise.all(fetchPromises);
        setPokeData(pokeResults);
      } catch (error) {
        setFetchError(error);
      }
    };

    // calls the above function
    fetchPokeData();
  }, []);

  return { pokeData, fetchError };
};

export default useFetchData;

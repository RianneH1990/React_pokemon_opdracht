import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon.js'
import pokemonlogo from './assets/Pokemon-Logo.png'

function App() {
    const [pokemonData, setPokemonData] = useState(null);
    const [previousLink, setPreviousLink] = useState(null);
    const [nextLink, setNextLink] = useState(null);
    const [linkToCollect, setLinkToCollect] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    const [error, setError] = useState("");

    function previousPage(){
        setLinkToCollect(previousLink);
        console.log(linkToCollect)
    }

    function nextPage(){
        setLinkToCollect(nextLink);
        console.log(linkToCollect)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(linkToCollect);
                setPokemonData(result.data.results);
                setNextLink(result.data.next);
                setPreviousLink(result.data.previous);
                console.log(result);
            } catch (e) {
                setError(e);
                console.error()
            }
        }
        fetchData();
    }, [linkToCollect]);



                return (
      <>
          <img src={pokemonlogo} alt="Pokemonlogo" id="pokemonlogo" />

          <div id="nav-buttons">
              <button
                  disabled={!previousLink}
                  className={!previousLink ? "disabled-button" : "enabled-button"}
                  type="button"
                  onClick={previousPage}
              >
                  Vorige
              </button>
              <button
                  disabled={!nextLink}
                  className={!nextLink ? "disabled-button" : "enabled-button"}
                  type="button"
                  onClick={nextPage}
              >
                  Volgende
              </button>
          </div>
          <div className="pokemon-wrapper">
              {pokemonData && pokemonData.map((pokemon) => {
                  return (
                      <Pokemon url={pokemon.url}/>
                  )
              })}
          </div>
      </>
  );
}

export default App;

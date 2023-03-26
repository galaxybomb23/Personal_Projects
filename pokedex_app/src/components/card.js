import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Info } from "./info";
import "../style/card.css";

export function Card() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonIndex, setPokemonIndex] = useState(0);

  const getAPIData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0%22"
      );
      const data = await response.json();
      const results = data.results;
      const pokemonList = await Promise.all(
        results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return {
            name: data.name,
            hp: data.stats[0].base_stat,
            type: data.types[0].type.name,
            height: data.height,
            weight: data.weight,
            abilityurl: data.abilities[0].ability.url,
            stats: {
              hp: data.stats[0].base_stat,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,
              specialattack: data.stats[3].base_stat,
              specialdefense: data.stats[4].base_stat,
              speed: data.stats[5].base_stat,
              type: data.types[0].type.name,
            },
            imagenorm: data.sprites.front_default,
            imgshiny: data.sprites.front_shiny,
          };
        })
      );
      setPokemonList(pokemonList);
      setPokemon(pokemonList[pokemonIndex]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  const handlePrevClick = () => {
    setPokemonIndex(pokemonIndex - 1);
    setPokemon(pokemonList[pokemonIndex - 1]);
  };

  const handleNextClick = () => {
    setPokemonIndex(pokemonIndex + 1);
    setPokemon(pokemonList[pokemonIndex + 1]);
  };

  return (
    <div className="card-container">
      <div className={`card ${pokemon.type}`}>
        <Header pokemon={pokemon} />
        <Info pokemon={pokemon} />

        <div className="buttondiv">
          <button onClick={handlePrevClick} disabled={pokemonIndex === 0}>
            Prev
          </button>
          <button
            className="buttonbody"
            onClick={handleNextClick}
            disabled={pokemonIndex === pokemonList.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

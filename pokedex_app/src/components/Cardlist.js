import React, { useState, useEffect } from "react";
import { Card } from "./card";
import "../style/cardlist.css";

export const CardList = ({}) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json();
    setNextUrl(data.next);
    const results = data.results;
    const dataArr = [];
    for (const result of results) {
      const response = await fetch(result.url);
      const data = await response.json();
      const pokemon = {
        name: data.name,
        weight: data.weight,
        height: data.height,
        type: data.types[0].type.name,
      };
      dataArr.push(pokemon);
    }
    setPokemonData(dataArr);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const response = await fetch(nextUrl);
    const data = await response.json();
    setNextUrl(data.next);
    const results = data.results;
    const dataArr = [];
    for (const result of results) {
      const response = await fetch(result.url);
      const data = await response.json();
      const pokemon = {
        name: data.name,
        weight: data.weight,
        height: data.height,
        type: data.types.map((type) => type.type.name).join(", "),
      };
      dataArr.push(pokemon);
    }
    setPokemonData([...pokemonData, ...dataArr]);
    setLoading(false);
  };

  const renderCards = () => {
    return pokemonData.map((pokemon, index) => {
      return <Card key={index} pokemon={pokemon} />;
    });
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < pokemonData.length; i += 5) {
      const row = pokemonData.slice(i, i + 5);
      rows.push(
        <div className="card-row" key={i}>
          {row.map((pokemon, index) => (
            <Card key={index} pokemon={pokemon} />
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <div className="card-list">{renderRows()}</div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <button className="load-more" onClick={loadMore}>
          Load More
        </button>
      )}
    </>
  );
};

export default CardList;

import React from "react";
import { Header } from "./header";
import { Info } from "./info";
import "../style/card.css";

export function Card(props) {
  const type = props.pokemon.type;

  return (
    <div id="card" type={type}>
      <Header pokemon={props.pokemon} />
      <Info pokemon={props.pokemon} />
    </div>
  );
}

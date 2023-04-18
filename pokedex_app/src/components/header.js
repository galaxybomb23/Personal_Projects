import React from 'react';
import '../style/header.css';

export function Header(props) {
      // Return some JSX here...
      return (
        <div id="header">
          <div id="container">
            <div id="name">
              <h1>
                { props.pokemon.name}
              </h1>
            </div>
            <div id="hp">
              <h1>
                { props.pokemon.hp}
              </h1>
            </div>
          </div>
          <div className="img-container">
          <img src={props.pokemon.imagenorm} alt="Picture of normal pokemon"></img>

          <img src = {props.pokemon.imgshiny} alt="Picture of shiny pokemon"></img>
          </div>
        </div>
      );
}
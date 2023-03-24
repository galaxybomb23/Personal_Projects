import React, { useState } from 'react';
import '../style/info.css';

export function Info(props) {


    // Return some JSX here...
    return (
      <div id="info">
        <div id = "blok">
          <h4>Height: {props.pokemon.height}</h4>
          <h4>Weight: {props.pokemon.weight}</h4>
        </div>
      </div>

    );
}
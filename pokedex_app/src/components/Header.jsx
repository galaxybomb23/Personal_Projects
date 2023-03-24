import React from "react";
import "../style/header.css";
import ImagePath from "../img/pikachu-field.jpg";

export function Header(props) {
  // Return some JSX here...
  return (
    <div id="header">
      <div id="container">
        <div id="normal">
          <h1>{props.imgnorm}</h1>
        </div>
        <div id="shiny">
          <h1>{props.imgshny}</h1>
        </div>
      </div>
    </div>
  );
}

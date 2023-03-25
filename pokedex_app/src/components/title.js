import React from "react";
import "../style/title.css";
import ImagePath from "../assets/logo_white.png";

export function Header() {
  return (
    <header>
        <div className="logo">
          <img src={ImagePath} alt="Logo" />
      </div>
      <div className="title">
        <h1>Pokedex</h1>
      </div>

    </header>
  );
}

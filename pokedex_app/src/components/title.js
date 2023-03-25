import React from "react";
import "../style/header.css";

export function Header() {
  return (
    <div class="header">
      <div class="title">Pokedex</div>
      <div class="logo img">
        <img src="../assets/logo_white.png" alt="Pokedex logo" />
      </div>
    </div>
  );
}

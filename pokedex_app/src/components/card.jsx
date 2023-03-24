
import React from "react";
import { Header} from "./header";
import { Info } from "./info";
import "../style/card.css";

export function Card(props) {
  return (
    <div id="card">
      <Header imgnorm = {props.img} imgshny = {props.imgshiny} />
      <Info name = {props.name} size = { props.size} weight = {props.weight}/>
    </div>
  );
}
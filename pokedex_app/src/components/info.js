import React, { useState, useEffect } from "react";
import "../style/info.css";

export function Info(props) {
  const [ability, setAbility] = useState(null);

  useEffect(() => {
    const fetchAbility = async () => {
      try {
        const response = await fetch(props.pokemon.abilityurl);
        const data = await response.json();
        setAbility(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAbility();
  }, [props.pokemon.abilityurl]);

   return (
     <div id="info">
       <div id="blok">
         <div id="ability">
           {ability && ability.names && ability.effect_entries ? (
             <>
               <h3>Ability: {ability.names[7].name}</h3>
               <p>{ability.flavor_text_entries[0].flavor_text}</p>
             </>
           ) : (
             <p>Loading ability data...</p>
           )}
         </div>
       </div>
       {props.pokemon.stats ? (
         <>
           <table>
             <tbody>
               
               <tr>
                 <td>Attack</td>
                 <td>{props.pokemon.stats.attack}</td>
               </tr>
               <tr>
                 <td>Defense</td>
                 <td>{props.pokemon.stats.defense}</td>
               </tr>
               <tr>
                 <td>Special Attack</td>
                 <td>{props.pokemon.stats.specialattack}</td>
               </tr>
               <tr>
                 <td>Special Defense</td>
                 <td>{props.pokemon.stats.specialdefense}</td>
               </tr>
               <tr>
                 <td>Speed</td>
                 <td>{props.pokemon.stats.speed}</td>
               </tr>
               <tr>
                 <td>Type</td>
                 <td>{props.pokemon.stats.type}</td>
               </tr>
             </tbody>
           </table>
         </>
       ) : (
         <p>Loading stats...</p>
       )}
     </div>
   );
}

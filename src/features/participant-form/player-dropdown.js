import React from 'react';

export default function PlayerDropdown(props) {
  return (
    <select onChange={props.handleChange}>
      {
        props.allPlayers.map(player => {
          return (
            <option key={player.playerid} value={player.playerid}>{player.name}</option>
          );
        })
      }
    </select>
  );
}
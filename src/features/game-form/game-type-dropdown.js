import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default function GameTypeDropdown(props) {
  return (
    <select> 
      onChange={props.handleChange}
    >
      {
        props.allGameTypes.map(gameType => {
          return (
            <option key={gameType.gametypeid} 
                    value={gameType.gametypeid}
            >
              {gameType.gametype_name}
            </option>
          );
        })
      }
    </select>
  );
}

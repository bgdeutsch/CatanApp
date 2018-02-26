import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default function GameTypeDropdown(props) {
  return (
    <SelectField 
      onChange={props.handleChange}
      value={props.selectedGameTypeId}
    >
      {
        props.allGameTypes.map(gameType => {
          return (
            <MenuItem key={gameType.gametypeid} 
                      value={gameType.gametypeid}
                      primaryText={gameType.gametype_name}
            >
            </MenuItem>
          );
        })
      }
    </SelectField>
  );
}

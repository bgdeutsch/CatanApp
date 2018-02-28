import React from 'react';
import {List, ListItem} from 'material-ui/List';

export default function CurrentGamePlayers(props) {
  return (
    <List>
      {
        props.allCurrentPlayers.map((player, index) => {
          return (
            <ListItem key={index}
											primaryText={player}>
						</ListItem>
          );
        })
      }
    </List>
  );
}
import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function AllPlayersDropdown(props) {

	return (
		props.allPlayers.map(player => {
			return (
				<ul>
					<li key={player.player_id}>{player.player_name}</li>
				</ul>
			)
		})
	)

}
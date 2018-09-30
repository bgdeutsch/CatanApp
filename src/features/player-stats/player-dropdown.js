import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function AllPlayersDropdown(props) {
	return (
		<form>
			<InputLabel>Select A Player:</InputLabel>
			<Select
				value={props.selectedPlayer}
				onChange={props.handlePlayerDropdownChange}
				autoWidth={true}
				displayEmpty={true}
			>
			<MenuItem value="-1">
				(select)
			</MenuItem>
				{
					props.allPlayers.map(player => {
						return (
							<MenuItem key={player.player_id} 
												value={player.player_id}>
								{player.player_name}
							</MenuItem>
						)
					})
				}
			</Select>
		</form>
	)
}
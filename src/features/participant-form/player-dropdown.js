import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function PlayerDropdown(props) {
	return (
		<div>
			<FormControl className='dropdown' variant="filled">
			<Select
					value={props.selectedPlayer}
					onChange={props.handleChange}>
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
			</FormControl>
			<FormHelperText>Select Player</FormHelperText>
		</div>
	)
}
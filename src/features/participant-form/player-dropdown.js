import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const labelStyles = {
	top: '-10px',
	left: '-10px'
}
export default function PlayerDropdown(props) {
	return (
		<div>
			<FormControl className='dropdown' variant="filled">
				<InputLabel style={labelStyles}>Select Player *</InputLabel>
				<Select value={props.selectedPlayer} onChange={props.handleChange} required>
					<MenuItem value={-1}><em>(select)</em></MenuItem>
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
		</div>
	)
}
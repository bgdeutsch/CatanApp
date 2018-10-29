import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function GameTypeDropdown(props) {
	return (
		<div>
			<InputLabel>Choose a Game Type:</InputLabel>
			<Select
					value={props.selectedGameType}
					onChange={props.handleChange}
					fullWidth={true}>
			{
				props.gameTypes.map(type => {
					return (
						<MenuItem key={type.gametype_id} value={type.gametype_id}>
							{type.gametype_name}
						</MenuItem>
					)
				})
			}
			</Select>
		</div>
	)
}
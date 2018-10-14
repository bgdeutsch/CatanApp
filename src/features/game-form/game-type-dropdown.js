import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function GameTypeDropdown(props) {
	return (
		<div>
			<FormControl className='dropdown' variant="filled">
			<Select
					value={props.selectedGameType}
					onChange={props.handleChange}
			>
			{
				props.gameTypes.map(type => {
					return (
						<MenuItem key={type.gametype_id}
											value={type.gametype_id}>
							{type.gametype_name}
						</MenuItem>
					)
				})
			}
			</Select>
			</FormControl>
			<FormHelperText>Select Catan Game Type</FormHelperText>
		</div>
	)
}
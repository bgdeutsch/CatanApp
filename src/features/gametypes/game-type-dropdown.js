import React from 'react';
import { MenuItem, Select } from '@material-ui/core';

export default function GameTypeDropdown(props) {
	const listItemClassName = props.origin === "statsForm" ? "fs130" : "";

	return (
		<div>
			<Select
					value={props.selectedGameType}
					onChange={props.handleChange}
					fullWidth={true}>
					<MenuItem value="-1" disabled>
						Select Game Type
					</MenuItem>
			{
				props.gameTypes.map(type => {
					return (
						<MenuItem key={type.gametype_id} value={type.gametype_id} className={listItemClassName}>
							{type.gametype_name}
						</MenuItem>
					)
				})
			}
			</Select>
		</div>
	)
}
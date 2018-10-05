import React from 'react';
import axios from 'axios';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//	Currently this class is used only to get dropdown of players.
//	However it's set up so to easily add player functionality in the future.
export default class PlayerDropdown extends React.Component {
	constructor() {
		super();

		this.state = {
			allPlayers: []
		};
	}

	componentDidMount() {
		axios.get('http://localhost:3000/player/all')
			.then(results => {
				this.setState({ allPlayers: results.data });
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		return (
			<div>
				<Select>
				{
					this.state.allPlayers.map(player => {
						return (
							<MenuItem key={player.player_id}
												value={player.player_id}>
								{player.player_name}
							</MenuItem>
						)
					})
				}
				</Select>
				<FormHelperText>Select Player</FormHelperText>
			</div>
		)
	}
}
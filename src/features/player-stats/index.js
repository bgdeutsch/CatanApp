import React from 'react';
import PlayerDropdown from './player-dropdown';
import axios from 'axios';

export default class PlayerStats extends React.Component {
	constructor() {
		super();

		this.state = {
			allPlayersArray: []
		}
	}

		componentDidMount() {
		const baseURL = 'http://localhost:3000/api/';

		axios.get(baseURL + 'players')
			.then(results => {
				this.setState({ allPlayersArray: results.data });
			})
			.catch(err => {
				console.log(err);
			})
		}

	render() {
		return (
			<div>
				<PlayerDropdown allPlayers={this.state.allPlayersArray} />
			</div>
		)
	}
}
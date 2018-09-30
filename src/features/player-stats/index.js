import React from 'react';
import PlayerDropdown from './player-dropdown';
import axios from 'axios';

export default class PlayerStats extends React.Component {
	constructor() {
		super();

		this.state = {
			allPlayersArray: [],
			selectedPlayer: -1
		}
		
		this.handlePlayerDropdownChange = this.handlePlayerDropdownChange.bind(this);
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

	handlePlayerDropdownChange = event => {
		this.setState({ selectedPlayer: event.target.value })
		console.log('test' + event.target.value)
	}

	render() {
		return (
			<div>
				<PlayerDropdown allPlayers={this.state.allPlayersArray}
				 								selectedPlayer={this.state.selectedPlayer} 
												onChange={this.state.handlePlayerDropdownChange} />
			</div>
		)
	}
}
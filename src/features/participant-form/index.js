import React, { Component } from 'react';
import PlayerDropdown from './player-dropdown';
import axios from 'axios';

export default class ParticipantForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedPlayerId: -1,
			allPlayers: [],
			victoryPoints: '',
			placementOrder: -1,
			placementOrderArray: [1, 2, 3, 4, 5, 6],
		};

		this.handlePlayerChange = this.handlePlayerChange.bind(this)
		this.handleVictoryPointsChange = this.handleVictoryPointsChange.bind(this)
		this.addParticipant = this.addParticipant.bind(this)
	}

	componentDidMount() {
		axios.get('http://localhost:3000/api/players/')
		.then(results => {
      this.setState({
        allPlayers: results.data,
        selectedPlayerId: results.data[0].playerid,
      })
    })
    .catch(err => {
      console.log(err);
    })
	}

	handlePlayerChange(event) {
		this.setState({selectedPlayerId: event.target.value});
	}

	handleVictoryPointsChange(event) {
		this.setState({victoryPoints: event.target.value});
	}

	addParticipant(event) {
		event.preventDefault();
		let playerid = this.state.selectedPlayerId;
		let victoryPoints = this.state.victoryPoints;
		let placementOrder = this.state.placementOrder;

		// console.log('playerid= ' + playerid + '  ' + victoryPoints);
	}
 
	render() {
		return (
			<form ref="participantForm">
				<label htmlFor="playerid">Choose Player:</label> 
				<PlayerDropdown
					handleChange={this.handlePlayerChange}
					allPlayers={this.state.allPlayers}
				/>
				<br />

				<label htmlFor="victoryPoints">VPs:</label> 
				<input type="text" 
							 value={this.state.victoryPoints}
							 onChange={this.handleVictoryPointsChange} />

				<br />

				<label htmlFor="placementOrder">Placement Order:</label>
				<select onChange={this.handlePlacementOrderChange}>
					{
						this.state.placementOrderArray.map(index => {
							return (
								<option key={index} value={index}>{index}</option>
							);
						})
					}
				</select>

				<br />
				<br />
				<button onClick={this.addParticipant}>Add Player</button>

			</form>
		);
	}
}
import React from 'react';
import PlayerDropdown from './player-dropdown';
import CurrentGamePlayers from './current-game-players';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class ParticipantForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedPlayerId: -1,
			selectedPlayerName: '',
			allPlayers: [],
			currentGamePlayers: [],
			placementOrder: -1,
			placementOrderArray: [1, 2, 3, 4, 5, 6],
			open: false,
			redirect: false
		};
		
		this.handlePlayerChange = this.handlePlayerChange.bind(this);
		this.handlePlacementOrderChange = this.handlePlacementOrderChange.bind(this);
		this.addParticipant = this.addParticipant.bind(this);
	}

	componentDidMount() {
		axios.get('http://localhost:3000/api/players/')
		.then(results => {
      this.setState({
        allPlayers: results.data,
        selectedPlayerId: results.data[0].playerid,
				selectedPlayerName: results.data[0].name,
				placementOrder: 1
      })
    })
    .catch(err => {
      console.log(err);
    })
	}

	handlePlacementOrderChange(event) {
		this.setState({placementOrder: event.target.value});
	}

	handlePlayerChange(event) {
		this.setState({
			selectedPlayerId: event.target.value,
			selectedPlayerName: event.target.selectedOptions[0].text
		});
	}

	addParticipant(event) {
		event.preventDefault();
		let playerID = this.state.selectedPlayerId;
		let placementOrder = this.state.placementOrder;
		let selectedPlayerName = this.state.selectedPlayerName;
		let currentGamePlayers = this.state.currentGamePlayers.slice();
		

		axios.post('http://localhost:3000/api/addParticipant/', {
      playerid: playerID,
			placement_order: placementOrder
    })
    .then(results => {
			currentGamePlayers.push(selectedPlayerName)
			this.setState({ currentGamePlayers: currentGamePlayers })
    })
    .catch(err => {
      console.log(err);
    })
	}
 
	render() {
		if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: "/",
          state: { success: this.state.redirect }
        }} />
      )
		}
		return (
			<div className="text-center">
				<CurrentGamePlayers allCurrentPlayers={this.state.currentGamePlayers}/>
				<p>Next, add players.</p>
				<form ref="participantForm" className="text-center">
				<label htmlFor="playerID">Choose Player:</label> 
					<PlayerDropdown
						handleChange={this.handlePlayerChange}
						allPlayers={this.state.allPlayers}
					/>
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
					<RaisedButton label="Add Player" 
												onClick={this.addParticipant}
												className="raised-button" />
														
					<RaisedButton label="Next" 
												onClick={this.startGame} 
												className="raised-button" />
				</form>
			</div>
		);
	}
}
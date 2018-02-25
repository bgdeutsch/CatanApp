import React, { Component } from 'react';
import PlayerDropdown from './player-dropdown';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export default class ParticipantForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedPlayerId: -1,
			allPlayers: [],
			placementOrder: -1,
			placementOrderArray: [1, 2, 3, 4, 5, 6],
			open: false
		};
		
		this.handlePlayerChange = this.handlePlayerChange.bind(this);
		this.handlePlacementOrderChange = this.handlePlacementOrderChange.bind(this);
		this.addParticipant = this.addParticipant.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
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

	handlePlacementOrderChange(event) {
		this.setState({placementOrder: event.target.value});
	}

	handlePlayerChange(event) {
		this.setState({selectedPlayerId: event.target.value});
		console.log(event.target.value);
	}

	handleOpen() {
		this.setState({open: true})
	}

	handleClose() {
		this.setState({open: false})
	}

	addParticipant(event) {
		event.preventDefault();
		let playerID = this.state.selectedPlayerId;
		let placementOrder = this.state.placementOrder;

		axios.post('http://localhost:3000/api/addParticipant/', {
      playerid: playerID,
			placement_order: placementOrder
    })
    .then(results => {
      console.log('successfully added player!');
			this.handleClose();
    })
    .catch(err => {
      console.log(err);
    })
	}
 
	render() {
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.addParticipant}
      />,
    ];

		return (
			<div className="text-center">
				<RaisedButton label="Add Player" onClick={this.handleOpen} />

				<Dialog
          title="Add Player"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
					className="text-center"
        >

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
					</form>
				</Dialog>
			</div>
		);
	}
}
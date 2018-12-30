import React from 'react';
import axios from 'axios';
import ExistingGame from './existing-game';
import GameTypeDropdown from '../gametypes';
import {Button, FormControl, TextField} from '@material-ui/core';
import { API_URL } from '../../helpers';
const baseURL = API_URL();

 export default class GameForm extends React.Component {
	constructor() {
		super();

		this.state = {
			gameTypes: [],
			selectedGameType: -1, 	// Base game
			notes: '',
			activeGameID: -1
		};
	}

	componentDidMount() {
		this.existingActiveGameCheck();
	};

	existingActiveGameCheck() {
		axios.get(baseURL + 'activegame')
			.then(results => {
				if (results.data.length < 1) {
					this.loadGameTypes();
				}
				else {
					this.setState({ activeGameID: results.data[0].game_id });
				}
			})
			.catch(err => {
				console.log(err);
			})
	}

	handleNotesChange = event => {
		this.setState({notes: event.target.value});
	}

	handleSubmit = event => {
		event.preventDefault();
		this.createGame();
	}

	fetchSelectedGameType = gameTypeID => {
		this.setState({selectedGameType: gameTypeID})
	}

	createGame = () => {
		axios.post(baseURL + 'create', {
			gametypeID: this.state.selectedGameType,
			notes: this.state.notes
		})
			.then(results => {
				this.redirectToNewGame();
			})
			.catch(err => {
				console.log(err);
			})
	}

	redirectToNewGame = () => {
		axios.get(baseURL + 'currentgame')
			.then(results => {
				let newGameRoute = '/game/' + results.data[0].game_id;
				this.props.history.push(newGameRoute);
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		const activeGameID = this.state.activeGameID;
		let submitButtonDisabled = parseInt(this.state.selectedGameType) < 0 ? true : false;

		if (activeGameID > 0) {
			return (
				<ExistingGame activeGameID={activeGameID} />
			)
		}
		
		return (
			<div className='text-center'>
				<div className='game-details'>
					<h2>Add a New Game:</h2>
					<br />
					<form onSubmit={this.handleSubmit}>
						<FormControl className='w300' id="gametype_form">
							<GameTypeDropdown origin='gameForm' fetchSelectedGameType={this.fetchSelectedGameType} />
							<br />
							<TextField
								label="Notes"
								multiline
								margin="normal"
								value={this.state.notes}
								onChange={this.handleNotesChange}
							/>
							<br />
							<Button type="submit" color="primary" variant="contained" disabled={submitButtonDisabled}>
								Next
							</Button>
						</FormControl>
					</form>
				</div>
			</div>
		)
	}
}
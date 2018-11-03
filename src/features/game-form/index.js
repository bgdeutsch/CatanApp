import React from 'react';
import GameTypeDropdown from './game-type-dropdown';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ExistingGame from './existing-game';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

class GameForm extends React.Component {
	constructor() {
		super();

			this.state = {
				gameTypes: [],
				selectedGameType: 1, 	// Base game
				notes: '',
				activeGameID: -1
			};
	}

	componentDidMount() {
		this.existingActiveGameCheck();
	};

	existingActiveGameCheck() {
		axios.get('http://localhost:3000/activegame')
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

	loadGameTypes = () => {
		axios.get('http://localhost:3000/gametypes')
			.then(results => {
				this.setState({gameTypes: results.data});
			})
			.catch(err => {
				console.log(err);
			})
	}

	handleChange = event => {
		this.setState({selectedGameType: event.target.value});
	}

	handleNotesChange = event => {
		this.setState({notes: event.target.value});
	}

	handleSubmit = event => {
		event.preventDefault();
		this.createGame();
	}

	createGame = () => {
		axios.post('http://localhost:3000/create', {
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
		axios.get('http://localhost:3000/currentgame')
			.then(results => {
				let newGameRoute = '/game/' + results.data[0].game_id;
				this.props.history.push(newGameRoute);
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		let selectedGameType = this.state.selectedGameType;
		let activeGameID = this.state.activeGameID;

		if (activeGameID > 0) {
			return (
				<ExistingGame activeGameID={activeGameID} />
			)
		}
		else {
			return (
				<div className='text-center'>
					<div className='game-details'>
						<h2>Add a New Game:</h2>
						<br />
						<form onSubmit={this.handleSubmit}>
							<FormControl className='w300' id="gametype_form">
								<GameTypeDropdown
									gameTypes={this.state.gameTypes}
									selectedGameType={selectedGameType}
									handleChange={this.handleChange}
								/>
								<br />
								<TextField
									label="Notes"
									multiline
									margin="normal"
									value={this.state.notes}
									onChange={this.handleNotesChange}
								/>
								<br />
								<Button type="submit" color="primary" variant="contained">
									Next
								</Button>
							</FormControl>
						</form>
					</div>
				</div>
			)
		}
	}
}

export default GameForm;
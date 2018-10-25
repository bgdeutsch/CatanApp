import React from 'react';
import GameTypeDropdown from './game-type-dropdown';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class GameForm extends React.Component {
	constructor() {
		super();

			this.state = {
				gameTypes: [],
				selectedGameType: 1 	// Base game
			};
	}

	componentDidMount() {
		this.loadGameTypes();
	};

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

	handleSubmit = event => {
		event.preventDefault();
		this.createGame();
	}

	createGame = () => {
		axios.post('http://localhost:3000/create', {
			gametypeID: this.state.selectedGameType
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
		return (
			<form onSubmit={this.handleSubmit}>
				<div className='game-details'>
					<GameTypeDropdown
						gameTypes={this.state.gameTypes}
						selectedGameType={selectedGameType}
						handleChange={this.handleChange}
					/>
					<Button color="primary" variant="contained">
						Next
					</Button>
				</div>
			</form>
		)
	}
}

export default GameForm;
import React from 'react'
import ActiveGame from './active-game'
import GameTypeDropdown from '../gametypes'
import {Button, FormControl, TextField} from '@material-ui/core'
import {createNewGame, getActiveGame} from '../../utils/api'

 export default class GameForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			gameTypes: [],
			selectedGameTypeID: -1,
			notes: '',
			activeGameID: -1
		};
	}

	componentDidMount() {
		this.activeGameCheck();
	};

	activeGameCheck() {
		getActiveGame()
			.then(results => {
				if (results.length) {
					this.setState({ activeGameID: results[0].game_id })
				}
			})
			.catch((err) => console.warn(err))
	}

	handleNotesChange = event => {
		this.setState({notes: event.target.value});
	}

	handleSubmit = event => {
		event.preventDefault();
		this.createGame();
	}

	fetchSelectedGameType = gameTypeID => {
		this.setState({selectedGameTypeID: gameTypeID})
	}

	createGame = () => {
		const {selectedGameTypeID, notes} = this.state

		createNewGame(selectedGameTypeID, notes)
			.then(results => {
				// const newGameRoute = `game/${results.data.game_id}`
				const newGameRoute = `game?gid=${results.data.game_id}`
				this.props.history.push(newGameRoute)
			})
			.catch(err => console.warn(err))
	}

	render() {
		const {activeGameID, notes, selectedGameTypeID} = this.state
		const submitButtonDisabled = parseInt(selectedGameTypeID, 10) < 0

		if (activeGameID > 0) {
			return (
				<ActiveGame activeGameID={activeGameID} />
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
								value={notes}
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
import React from 'react'
import PlayerDropdown from './player-dropdown'
import Loading from '../loading'
import { fetchPlayers, createGameParticipant, completeGame } from '../../utils/api'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	TextField,
	Typography
} from '@material-ui/core'

export default class ParticipantForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			modalOpen: false,
			players: null,
			selectedPlayerID: -1,
			VP: 0,
			placementOrder: 1,
			isLoading: true
		}
	}

	componentDidMount() {
		this.fetchPlayersByGame(this.props.gameID)
	}

	fetchPlayersByGame(gameID) {
		fetchPlayers(gameID)
		.then(players => {
			this.setState({ players, isLoading: false })
		})
		.catch(err => console.warn(err))
	}

	handleModalOpen = () => {
    this.setState({ modalOpen: true })
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false, selectedPlayerID: -1, VP: 0, placementOrder: 1 })
  };

	handleSubmit = event => {
		event.preventDefault()
		const { selectedPlayerID, placementOrder, VP } = this.state
		const { gameID } = this.props

		createGameParticipant(selectedPlayerID, placementOrder, VP)
			.then(() => {
				this.props.fetchGameData(gameID)
				this.fetchPlayersByGame(gameID)
				this.handleModalClose()
			})
			.catch(err => console.warn(err))
	}

	handlePlayerDropdownChange = event => {
		this.setState({ selectedPlayerID: event.target.value })
	}

	handleNumberInputChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleCompleteGame = () => {
		completeGame(this.props.gameID)
			.then(() => {
				this.props.fetchGameData(this.props.gameID)
			})
			.catch(err => console.warn(err))
	}

	render() {
		const {players, selectedPlayerID, placementOrder, VP, isLoading} = this.state
		const isSubmitDisabled = selectedPlayerID <= 0

		if (isLoading) {
			return <Loading />
		}

		return (
			<Paper className='card'>
				<div className='participant-form-container'>
					<span>
						<Typography variant="headline">This is an active game!</Typography>
						<br />
						<Typography variant="subheading">Add players and click "Complete" after settling.</Typography>
					</span>
					<br />
					<br />
					<span className='actions'>
						<Button onClick={this.handleModalOpen} variant="outlined">Add Player</Button>
						<Button onClick={this.handleCompleteGame} variant="contained" color="primary">
							Complete Game
						</Button>
					</span>
					<Dialog
						open={this.state.modalOpen}
						onClose={this.handleModalClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle>Add Setller</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Enter the player, order in which their first settlement was placed, and total victory points for the game.
							</DialogContentText>
							<form className='form-dialog'>
								<PlayerDropdown 
									allPlayers={players}
									handleChange={this.handlePlayerDropdownChange}
									selectedPlayer={selectedPlayerID}
								/>
								<TextField
									name="placementOrder"
									label="Placement Order"
									value={placementOrder}
									onChange={this.handleNumberInputChange}
									margin="normal"
									className="w150"
									autoComplete="false"
									type="number"
									required
								/>
								<TextField
									name="VP"
									label="VP"
									value={VP}
									onChange={this.handleNumberInputChange}
									margin="normal"
									className="w150"
									autoComplete="false"
									type="number"
									required
								/>
							</form>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleModalClose} variant="outlined">
								Cancel
							</Button>
							<Button onClick={this.handleSubmit} variant="contained" color="primary" disabled={isSubmitDisabled}>
								Add Player
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</Paper>
		)
	}
}
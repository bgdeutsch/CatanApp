import React from 'react';
import PlayerDropdown from './player-dropdown';
import axios from 'axios';
import { API_URL } from '../../helpers';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Paper,
	TextField,
	Typography
} from '@material-ui/core';

const baseURL = API_URL();

export default class ParticipantForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
			allPlayers: null,
			selectedPlayer: -1,
			VP: 0,
			placementOrder: 1
		};
	}

	componentDidMount() {
		this.loadAllPlayers();
	}

	handleClickOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false, selectedPlayer: -1 });
  };

	handleSubmit = event => {
		event.preventDefault();
		axios.post(baseURL + 'create/participant', {
			playerID: this.state.selectedPlayer,
			placementOrder: this.state.placementOrder,
			VP: this.state.VP
		})
			.then(results => {
				this.handleClose();
				window.location.reload();
			})
			.catch(err => {
				console.log(err);
			})
	}

	handlePlayerDropdownChange = event => {
		this.setState({selectedPlayer: event.target.value});
	}

	handleNumberInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleCompleteGame = event => {
		let URL = baseURL + 'game/' + this.props.gameID;
		axios.put(URL)
			.then(results => {
				window.location.reload();
			})
			.catch(err => {
				console.log(err);
			})
	}

	loadAllPlayers = () => {
		const URL = baseURL + 'player/all';

		axios.get(URL, {
			params: {
				gameID: this.props.gameID
			}		
		})
			.then(results => {
				this.setState({allPlayers: results.data});
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		const {allPlayers, selectedPlayer, placementOrder, VP} = this.state;

		if (allPlayers === null) {
			return <CircularProgress />
		}

		return (
			<Paper>
				<div className='participant-form-container'>
					<span>
						<Typography variant="headline">This is an active game!</Typography>
						<br />
						<Typography variant="subheading">Add players and click "Complete" after settling.</Typography>
					</span>
					<br />
					<br />
					<span className='actions'>
						<Button onClick={this.handleClickOpen} variant="outlined">Add Player</Button>
						<Button onClick={this.handleCompleteGame} variant="contained" color="primary">
							Complete Game
						</Button>
					</span>
					<Dialog
						open={this.state.modalOpen}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle>Add Player to the Game</DialogTitle>
						<DialogContent>
							<form>
								<PlayerDropdown 
									allPlayers={allPlayers}
									handleChange={this.handlePlayerDropdownChange}
									selectedPlayer={selectedPlayer}
								/>
								<TextField
									name="placementOrder"
									label="Placement Order"
									value={placementOrder}
									onChange={this.handleNumberInputChange}
									margin="normal"
								/>
								<br />
								<TextField
									name="VP"
									label="VP"
									value={VP}
									onChange={this.handleNumberInputChange}
									margin="normal"
								/>
							</form>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} variant="outlined">
								Cancel
							</Button>
							<Button onClick={this.handleSubmit} variant="contained" color="primary" disabled={selectedPlayer > 0 ? false : true}>
								Add Player
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</Paper>
		)
	}
}
import React from 'react';
import PlayerDropdown from './player-dropdown';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { API_URL } from '../../helpers';

const baseURL = API_URL();

export default class ParticipantForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
			allPlayers: [],
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
		let allPlayers = this.state.allPlayers;
		let selectedPlayer = this.state.selectedPlayer;
		let placementOrder = this.state.placementOrder;
		let VP = this.state.VP;
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
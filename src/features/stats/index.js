import React from 'react';
import axios from 'axios';
import GameTypeDropdown from '../gametypes';
import PlayerStats from './player-stats';
import { API_URL } from '../../helpers';
import {CircularProgress, Paper, Typography} from '@material-ui/core';

export default class Stats extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedGameTypeID: 1,	//	default selection should always be BASE game.
			gameTypeStats: null,
			gameTypeStatsByPlayer: []
		}
	}

	componentDidMount() {
		this.loadStats(this.state.selectedGameTypeID);
	}

	loadStats = gameTypeID => {
		// TODO: look into setting up .env e.g. process.env.NODE_ENV;
		const baseURL = API_URL() + 'stats/gametypes/' + gameTypeID;

		axios.all([axios.get(baseURL), axios.get(baseURL + '/all')])
			.then(axios.spread((gameTypeStats, gameTypeStatsByPlayer) => {  
         this.setState({ 
					 gameTypeStats: gameTypeStats.data,
					 gameTypeStatsByPlayer: gameTypeStatsByPlayer.data
				 })
     }))
		 .catch(err => {
			 console.log(err);
		 })
	}
	
	fetchSelectedGameType = gameTypeID => {
		const oldSelectedGameTypeID = this.state.selectedGameTypeID;

		console.log('previous game type id= ' + oldSelectedGameTypeID + ', new game type id = ' + gameTypeID);

		if (oldSelectedGameTypeID !== gameTypeID) {
			this.setState({selectedGameTypeID: gameTypeID});
			this.loadStats(gameTypeID);
		}	
	}

	render() {
		const {gameTypeStats, gameTypeStatsByPlayer, selectedGameTypeID} = this.state;

		if (gameTypeStats === null || selectedGameTypeID === null) {
			return <CircularProgress />
		}

		const gameTypeName = gameTypeStats[0].gametype_name;
		const count = gameTypeStats[0].count;
		const sum = gameTypeStats[0].sum;

		return (
			<div>
				<Paper className='p15 margin-top'>
					<GameTypeDropdown origin='statsForm' fetchSelectedGameType={this.fetchSelectedGameType} />
					<br />
					<Typography variant="subtitle1" gutterBottom>
						There has been {count} {gameTypeName} sessions, with {sum} total VPs!
					</Typography>
				</Paper>
				<br />
				<PlayerStats gameTypeStatsByPlayer={gameTypeStatsByPlayer} />
			</div>
		)
	}
}
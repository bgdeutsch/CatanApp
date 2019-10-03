import React from 'react'
import GameTypeDropdown from '../gametypes'
import PlayerStats from './player-stats'
import Loading from '../loading'
import {Paper, Typography} from '@material-ui/core'
import {fetchStats} from '../../utils/api'

export default class Stats extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedGameTypeID: 1,
			gameTypeStats: null,
			gameTypeStatsByPlayer: []
		}
	}

	componentDidMount() {
		this.fetchGameTypeStats(this.state.selectedGameTypeID)
	}

	fetchSelectedGameType = gameTypeID => {
		const oldSelectedGameTypeID = this.state.selectedGameTypeID;

		if (oldSelectedGameTypeID !== gameTypeID) {
			this.setState({selectedGameTypeID: gameTypeID});
			this.fetchGameTypeStats(gameTypeID);
		}	
	}

	fetchGameTypeStats = gameTypeID => {
		fetchStats(gameTypeID)
		.then(stats => {
			this.setState({
				gameTypeStats: stats[0],
				gameTypeStatsByPlayer: stats[1]
			})
		})
		.catch(err => console.warn(err))
	}

	render() {
		const {gameTypeStats, gameTypeStatsByPlayer, selectedGameTypeID} = this.state;

		if (gameTypeStats === null || selectedGameTypeID === null) {
			return <Loading />
		}

		const gameTypeName = gameTypeStats[0].gametype_name;
		const count = gameTypeStats[0].count;
		const sum = gameTypeStats[0].sum;

		return (
			<div>
				<Paper className='card'>
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
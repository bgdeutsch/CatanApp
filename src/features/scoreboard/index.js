import React from 'react';
import axios from 'axios';
import ScoreboardTable from './scoreboard-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { API_URL } from '../../helpers';

export default class Scoreboard extends React.Component {
	constructor() {
		super();

		this.state = {
			recentGamesArray: null
		}
	}

	componentDidMount() {
		const baseURL = API_URL();

		axios.get(baseURL)
			.then(results => {
				this.setState({ recentGamesArray: results.data });
			})
			.catch(err => {
				console.log(err);
			})
		}

		render() {
			const {recentGamesArray} = this.state;

			if (recentGamesArray === null) {
				return <CircularProgress />
			}

			return (
				<div className="margin-top">
					<ScoreboardTable recentGames={recentGamesArray} />
				</div>
			)
		}
	}
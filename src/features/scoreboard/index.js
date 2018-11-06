import React from 'react';
import ScoreboardTable from './scoreboard-table';
import axios from 'axios';
import { API_URL } from '../../helpers';

export default class Scoreboard extends React.Component {
	constructor() {
		super();

		this.state = {
			recentGamesArray: []
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
			return (
				<div className="margin-top">
					<ScoreboardTable recentGames={ this.state.recentGamesArray } />
				</div>
			)
		}
	}
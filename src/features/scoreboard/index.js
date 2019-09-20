import React from 'react';
import axios from 'axios';
import ScoreboardTable from './scoreboard-table';
import Loading from '../loading';
import { API_URL } from '../../helpers';

export default class Scoreboard extends React.Component {
	constructor() {
		super();

		this.state = {
			recentGamesArray: [],
			isLoading: true
		}
	}

	componentDidMount() {
		const baseURL = API_URL();

		axios.get(baseURL)
		.then(results => {
			this.setState({ recentGamesArray: results.data, isLoading: false });
		})
		.catch(err => {
			console.log(err);
		})
	}

	render() {
		const {recentGamesArray, isLoading} = this.state;

		if (isLoading) {
			return <Loading />
		}

		return (
			<ScoreboardTable recentGames={recentGamesArray} />
		)
	}
}
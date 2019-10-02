import React from 'react';
import ScoreboardTable from './scoreboard-table';
import Loading from '../loading';
import {fetchRecentGames} from '../../utils/api';

export default class Scoreboard extends React.Component {
	constructor() {
		super();

		this.state = {
			recentGamesArray: [],
			isLoading: true
		}
	}

	componentDidMount() {
		fetchRecentGames()
			.then((results) => {
					this.setState({ recentGamesArray: results, isLoading: false})
			})
			.catch((err) => {
				console.warn(err)
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
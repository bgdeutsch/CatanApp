import React from 'react';
import RecentGamesTable from './recent-games-table';
import axios from 'axios';

export default class RecentGames extends React.Component {
	constructor() {
		super();

		this.state = {
			recentGamesArray: [],
		}
	}

	componentDidMount() {
		const baseURL = 'http://localhost:3000/api/games/';

		axios.get(baseURL + 'recentGames')
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
					<RecentGamesTable recentGames={this.state.recentGamesArray} />
				</div>
			)
		}
	}
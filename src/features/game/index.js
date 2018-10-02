import React from 'react';
import axios from 'axios';
import GameDetails from './game-details';
import { isJavaScriptObjectEmpty } from '../../helpers';

export default class Game extends React.Component {
	constructor() {
		super();

		this.state = {
			gameDetailsObject: {}
		}
	}

	componentDidMount() {
		let URL = 'http://localhost:3000/game/' + this.props.match.params.id;
		
		axios.get(URL)
			.then(results => {
				this.setState({ gameDetailsObject: results.data[0] })
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		//	ensure state is ready before rendering table.
		if (isJavaScriptObjectEmpty(this.state.gameDetailsObject)) {
			return null;
		} else {
			return (
				<GameDetails gameDetailsObject={ this.state.gameDetailsObject } />
			)
		}
	}
} 
import React from 'react';
import axios from 'axios';
import GameDetails from './game-details';
import ParticipantDetails from './participant-details'
import { isJavaScriptObjectEmpty } from '../../helpers';

export default class Game extends React.Component {
	constructor() {
		super();

		this.state = {
			gameDetail: {},
			gameParticipantDetail: []
		}
	}

	async componentDidMount() {
		const baseURL = 'http://localhost:3000/game/' + this.props.match.params.id;

		axios.all([axios.get(baseURL), axios.get(baseURL + '/participants')])
			.then(axios.spread((gameDetail, gameParticipantDetail) => {  
         this.setState({ 
					 gameDetail: gameDetail.data[0],
					 gameParticipantDetail: gameParticipantDetail.data
				 })
     }))
		 .catch(err => {
			 console.log(err);
		 })
	}

	render() {
		//	ensure state is ready before rendering table.
		if (isJavaScriptObjectEmpty(this.state.gameDetail) || isJavaScriptObjectEmpty(this.state.gameParticipantDetail)) {
			return null;
		} else {
			return (
				<div>
					<GameDetails gameDetailsObject={ this.state.gameDetail } />
					<ParticipantDetails participantDetail={ this.state.gameParticipantDetail } />
				</div>
			)
		}
	}
} 
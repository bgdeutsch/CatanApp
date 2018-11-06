import React from 'react';
import axios from 'axios';
import GameDetails from './game-details';
import ParticipantDetails from './participant-details'
import ParticipantForm from '../participant-form';
import { isJavaScriptObjectEmpty, API_URL } from '../../helpers';

export default class Game extends React.Component {
	constructor() {
		super();

		this.state = {
			gameDetail: {},
			gameParticipantDetail: []
		}
	}

	async componentDidMount() {
		const baseURL = API_URL() + 'game/' + this.props.match.params.id;

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

	renderActiveGame = () => {
		return !this.state.gameDetail.is_active ? null : <ParticipantForm gameID={this.props.match.params.id} />;
	}

	render() {
		//	ensure state is ready before rendering table.
		if (isJavaScriptObjectEmpty(this.state.gameDetail)) {
			return null;
		} else {
			return (
				<div>
					{this.renderActiveGame()}
					<GameDetails gameDetailsObject={this.state.gameDetail} />
					<br />
					<ParticipantDetails participantDetail={this.state.gameParticipantDetail} />
				</div>
			)
		}
	}
} 
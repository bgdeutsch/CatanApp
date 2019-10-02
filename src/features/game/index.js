import React from 'react';
import queryString from 'query-string'
import GameDetails from './game-details';
import ParticipantDetails from './participant-details'
import ParticipantForm from '../participant-form';
import Loading from '../loading';
import {fetchGame} from '../../utils/api'
import Error from '../../utils/error'

export default class Game extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			gameData: {},
			playerData: [],
			isLoading: true
		}

		this.fetchGameData = this.fetchGameData.bind(this)
	}

	componentDidMount() {
		this.fetchGameData(queryString.parse(this.props.location.search).gid)
	}

	fetchGameData(gameID) {
		fetchGame(gameID)
			.then(data => {
				this.setState({
					gameData: data[0],
					playerData: data[1],
					isLoading: false
				})
			})
			.catch(err => console.warn(err))
	}

	renderGameDetail() {
		return <GameDetails gameData={this.state.gameData[0]} />
	}
	
	renderParticipantForm() {
		const gameID = queryString.parse(this.props.location.search).gid
		return <ParticipantForm gameID={gameID} fetchGameData={this.fetchGameData} />	
	}

	render() {
		const { gameData, playerData, isLoading } = this.state;
		const isActiveGame = gameData[0] && gameData[0].is_active

		if (isLoading) {
			return (
				<Loading />
			)
		} else if (!gameData.length) {
			return (
				<Error />
			)
		}

		return (
			<React.Fragment>
				{isActiveGame ? this.renderParticipantForm() : this.renderGameDetail()}
				<br />
				<ParticipantDetails participantData={playerData} />
			</React.Fragment>
		)
	}
} 
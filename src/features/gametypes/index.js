import React from 'react';
import axios from 'axios';
import GameTypeDropdown from './game-type-dropdown';
import { API_URL } from '../../helpers';

export default class GameTypes extends React.Component {
	constructor() {
		super();

			this.state = {
				gameTypes: [],
				selectedGameType: 1
			};
	}

	componentDidMount() {
		const selectedGameType = this.props.origin === "gameForm" ? -1 : 1;
		this.setState({selectedGameType: selectedGameType});
		this.loadGameTypes();
	};

	loadGameTypes = () => {
		const baseURL = API_URL();

		axios.get(baseURL + 'gametypes')
			.then(results => {
				this.setState({gameTypes: results.data});
			})
			.catch(err => {
				console.log(err);
			})
	}

	handleChange = event => {
		this.setState({selectedGameType: event.target.value});
		this.props.fetchSelectedGameType(event.target.value);		//	this is a hack to make passing data from child to parent simpler, but i'll implement Flux pattern soon.
	}

	render() {
		const {selectedGameType, gameTypes} = this.state;

		return (
			<GameTypeDropdown 
				gameTypes={gameTypes}
				selectedGameType={selectedGameType}
				handleChange={this.handleChange}
				origin={this.props.origin} 
			/>
		)
	}
}
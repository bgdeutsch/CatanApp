import React from 'react';
import GameTypeDropdown from './game-type-dropdown';
import {fetchGameTypes} from '../../utils/api';

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
		fetchGameTypes()
			.then((results) => {
				this.setState({ gameTypes: results, isLoading: false})
			})
			.catch((err) => {
				console.warn(err)
			})
	}

	handleChange = event => {
		this.setState({selectedGameType: event.target.value});
		this.props.fetchSelectedGameType(event.target.value);
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
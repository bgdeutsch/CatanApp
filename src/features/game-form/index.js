import React from 'react';
import GameTypeDropdown from '../game/game-type-dropdown';

export default class GameForm extends React.Component {
	constructor() {
		super();

		this.state = {
		};
	}

	render() {
		return (
			<GameTypeDropdown />
		)
	}
}
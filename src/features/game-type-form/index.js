import React from 'react';
import GameTypeDropdown from './game-type-dropdown';

export default class GameTypeForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<form>
				<GameTypeDropdown allGameTypes={this.props.allGameTypes} />
			</form>
		)
	}
}
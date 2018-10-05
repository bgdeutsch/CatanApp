import React from 'react';
import axios from 'axios';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class GameTypeDropdown extends React.Component {
	constructor() {
		super();

		this.state = {
			allGameTypes: []
		};
	}

	componentDidMount() {
		axios.get('http://localhost:3000/game/types')
			.then(results => {
				this.setState({ allGameTypes: results.data });
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		return (
			<div>
				<Select>
				{
					this.state.allGameTypes.map(type => {
						return (
							<MenuItem key={type.gametype_id}
												value={type.gametype_id}>
								{type.gametype_name}
							</MenuItem>
						)
					})
				}
				</Select>
				<FormHelperText>Select Catan Game Type</FormHelperText>
			</div>
		)
	}
}
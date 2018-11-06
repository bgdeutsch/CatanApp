import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function ExistingGame(props) {
	let activeGameURL = '/game/' + props.activeGameID;

	return (
		<Paper>
			<div className='game-details text-center'>
				<Typography variant="subheading">
					Looks like there is already a game in progress!
				</Typography>
				<br />
				<br />
				<Typography variant="title" color="primary">
					<Link to={activeGameURL} className="active-href">Click here to complete active Catan game.</Link>
				</Typography>
			</div>
		</Paper>
	)	
}
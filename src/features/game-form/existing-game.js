import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

export default function ExistingGame(props) {
	let activeGameURL = '/game/' + props.activeGameID;

	return (
		<div className='game-details text-center'>
			<Typography variant="title">
				Looks like there is already a game in progress! <br /><br />
				<Link to={activeGameURL}>Click here to complete active Catan game.</Link>
			</Typography>
		</div>
	)	
}
import React from 'react';
import Paper from '@material-ui/core/Paper';
import {trimDateTime} from '../../utils/helpers';

export default function GameDetails(props) {
	return (
		<Paper>
			<div className='game-details margin-top'>
				<b>Date:</b> {trimDateTime(props.gameData.creation_time)} <br />
				<b>Season:</b> {props.gameData.season} <br />
				<b>Type:</b> {props.gameData.gametype_name} <br />
				<span className={!props.gameData.notes ? 'display-none' : 'display-block'}>
					<b>Notes:</b> {props.gameData.notes}
				</span>
			</div>
		</Paper>
	)
}
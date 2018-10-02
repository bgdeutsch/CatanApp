import React from 'react';
import { trimDateTime } from '../../helpers';

export default function GameDetails(props) {
	console.log(props.gameDetailsObject.notes);
	return (
		<div className='game-details margin-top'>
			<b>Date:</b> {trimDateTime(props.gameDetailsObject.creation_time)} <br />
			<b>Season:</b> {props.gameDetailsObject.season} <br />
			<b>Type:</b> {props.gameDetailsObject.gametype_name} <br />
			<span className={props.gameDetailsObject.notes === null ? 'display-none' : 'display-block'}>
				<b>Notes:</b> {props.gameDetailsObject.notes}
			</span>
		</div>
	)
}
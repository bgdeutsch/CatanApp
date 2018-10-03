import React from 'react';

export default function ParticipantDetails(props) {
	return (
		props.participantDetail.map(participant => {
			return (
				<div key={participant.participant_id} className='game-details margin-top'>
					Test
				</div>
			)
		})
	)
}
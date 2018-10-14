import React from 'react';
import Table from 'material-ui/Table';
import TableHeader from 'material-ui/Table/TableHeader';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function ParticipantDetails(props) {
	if (props.participantDetail.length < 1) {
		return (
			<span>No players have been added yet.</span>
		)
	} else {
		return (
			<Table>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableCell component="th">Player</TableCell>
						<TableCell component="th">VP</TableCell>
						<TableCell component="th">Order</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{
						props.participantDetail.map(participant => {
							return (
								<TableRow key={participant.participant_id}>
									<TableCell>{participant.player_name}</TableCell>
									<TableCell>{participant.vp}</TableCell>
									<TableCell>{participant.placement_order}</TableCell>
								</TableRow>
							)
						})
					}
				</TableBody>
			</Table>
		)
	}
}
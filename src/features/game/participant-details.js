import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function ParticipantDetails(props) {
	if (props.participantData.length < 1) {
		return null
	} else {
		return (
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell component="th">Player</TableCell>
							<TableCell component="th">VP</TableCell>
							<TableCell component="th">Order</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							props.participantData.map(participant => {
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
			</Paper>
		)
	}
}
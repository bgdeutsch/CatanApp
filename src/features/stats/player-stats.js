import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function PlayerStats(props) {
	return (
		<Paper>
			<Table>
				<TableHead>
					<TableRow>
            <TableCell>Player</TableCell>
            <TableCell>Total Games</TableCell>
            <TableCell>Victories</TableCell>
            <TableCell>Avg Points Per Game</TableCell>
          </TableRow>
				</TableHead>
				<TableBody>
					{props.gameTypeStatsByPlayer.map((player, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{player.player_name}</TableCell>
                <TableCell>{player.total_games}</TableCell>
                <TableCell>{player.total_wins}</TableCell>
                <TableCell>{parseFloat(player.total_vp / player.total_games).toFixed(1)}</TableCell>
              </TableRow>
            );
          })}
				</TableBody>
			</Table>
		</Paper>
	)
}
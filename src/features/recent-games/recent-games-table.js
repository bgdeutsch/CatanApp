import React from 'react';
import crown from '../../crown.png';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default function RecentGamesTable(props) {
	const textCenter = {
		textAlign: 'center'
	}

	const tableBorder = {
		border: '1px solid #e0e0e0',
	}

	let trimDateTime = (string) => {
		return string.substring(0, string.indexOf('T'));
	}

	return (
		<Table style={tableBorder}>
			<TableHeader 
				displaySelectAll={false}
				adjustForCheckbox={false}
				style={textCenter}
			>
      	<TableRow>
					<TableHeaderColumn style={textCenter}>Winner</TableHeaderColumn>
					<TableHeaderColumn style={textCenter}>Game Type</TableHeaderColumn>
					<TableHeaderColumn style={textCenter}>Date</TableHeaderColumn>
				</TableRow>
    	</TableHeader>
			<TableBody 
				displayRowCheckbox={false}
			>
			{
				props.recentGames.map(game => {
					return (
						<TableRow key={game.game_id}>
						<TableRowColumn style={textCenter}>
							<img src={crown} alt="Winner" />:
							 &nbsp;
							 {game.player_name}
						</TableRowColumn>
						<TableRowColumn style={textCenter}>
							{game.gametype_name}
						</TableRowColumn>
						<TableRowColumn style={textCenter}>
							{trimDateTime(game.creation_time)}
						</TableRowColumn>
					</TableRow>
					)
				})
			}
			</TableBody>
		</Table>
	)
}
import React from 'react';
import next from '../../next.svg'
import { trimDateTime } from '../../utils/helpers';

export default function ScoreboardTable(props) {
	return (
		props.recentGames.map(game => {
			return (
				<div className='score-container' key={game.game_id}>
					<div>
						<span className='text-highlight'>{game.winner_name}</span><br />
						<span className='text-secondary'>
							{game.gametype_name}<br />
							{trimDateTime(game.creation_time)}
						</span>
					</div>
					<div>
						{/* <a href={'/game/' + game.game_id}> */}
						<a href={`/game?gid=${game.game_id}`}>
							<img className='margin-top' src={next} alt='Game Details' />
						</a>
					</div>
				</div>
			)
		})
	)
}

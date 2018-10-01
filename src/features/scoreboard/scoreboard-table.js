import React from 'react';
import next from '../../next.svg'

export default function ScoreboardTable(props) {

	let trimDateTime = (string) => {
		return string.substring(0, string.indexOf('T'));
	}

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
						<img src={next} alt='Game Details' />
					</div>
				</div>
			)
		})
	)
}

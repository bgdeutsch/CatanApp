import React from 'react';

export default function GameTypeDropdown(props) {
	return (
		<select>
			{
				props.allGameTypes.map(gameType => {
					return (
						<option key={gameType.gametype_id}
										value={gameType.gametype_id}>
							{gameType.gametype_name}
						</option>
					)
				})
			}
		</select>
	);
}
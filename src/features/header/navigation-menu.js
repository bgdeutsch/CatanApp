import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';

export default function NavigationMenu() {

	const iconStyle = {
		color: 'white',
		marginTop: '8px'
	};

	return (
		<div>
			<IconMenu
				iconButtonElement=
					{
						<IconButton iconStyle={iconStyle}>
							<Menu />
						</IconButton>
					}
				anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
    	>
				<MenuItem 
					primaryText="Home"
					containerElement={<Link to="/" />}
				/>
				<MenuItem 
					primaryText="Stats"
					containerElement={<Link to="/playerStats" />}
				/>
				<MenuItem 
					primaryText="New Game"
					containerElement={<Link to="/games/new" />}
				/>
			</IconMenu>
		</div>
	)
}
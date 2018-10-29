import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null
    }
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar title={"Yo Where We Stuck?"} position="sticky" color='primary'>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={this.handleMenu}>
            <MenuIcon />
          </IconButton>
          <h2 className='title'>Yo Where We Stuck?</h2>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              <Link to="/create">Add New Game</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}
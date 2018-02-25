import React, { Component } from 'react';
import './App.css';
import './Header.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Games from './Games'
import Header from './Header';
import GameForm from './features/game-form'

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <MuiThemeProvider>
        <Header />
        <br />
        <Games />
        <br />
        <GameForm />
      </MuiThemeProvider>
    );
  }
}

export default App;

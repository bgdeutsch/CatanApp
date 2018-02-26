import React, { Component } from 'react';
import './App.css';
import './Header.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Games from './Games';
import Header from './Header';
import GameForm from './features/game-form';
import ParticipantForm from './features/participant-form';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';

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
        <Router>
          <div className="center">
            <Route path="/" component={GameForm} />
            <Route path="/addPlayer" component={ParticipantForm} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

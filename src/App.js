import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from './features/header';
import Scoreboard from './features/scoreboard';
import GameDetails from './features/game';
import GameForm from './features/game-form';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#a91e20',
  },
});

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <Router>
          <div>
            <Header />
            <div className='container'>
              <Route exact path='/' component={ Scoreboard } />
              <Route exact path='/game/:id' component={ GameDetails } />
              <Route exact path='/create' component={ GameForm } />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

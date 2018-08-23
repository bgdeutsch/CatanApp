import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from './features/header';
import RecentGames from './features/recent-games';
import PlayerStats from './features/player-stats';
import { BrowserRouter as Router, Route } from 'react-router-dom';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#a91e20',
  },
});

class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <div>
            <Header />
            <div className='container'>
              <Route exact path='/' component={ RecentGames } />
              <Route exact path='/playerStats' component={ PlayerStats } />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

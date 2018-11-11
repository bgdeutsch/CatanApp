import React from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './features/header';
import Scoreboard from './features/scoreboard';
import GameDetails from './features/game';
import GameForm from './features/game-form';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#a91e20',
    },
    secondary: {
      main: '#f7d54c',
    },
  },
})

class App extends React.Component {
  render() {
    return (
      <HttpsRedirect>
        <MuiThemeProvider theme={theme}>
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
      </HttpsRedirect>
    );
  }
}

export default App;

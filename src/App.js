import React from 'react';
import './App.css';
import Header from './features/header';
import Loading from './features/loading';
import Error from './utils/error'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';

const Scoreboard = React.lazy(() => import('./features/scoreboard'));
const GameDetails = React.lazy(() => import('./features/game'));
const GameForm = React.lazy(() => import('./features/game-form'));
const Stats = React.lazy(() => import('./features/stats'));

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
            <React.Fragment>
              <Header />
              <div className='container'>
                <React.Suspense fallback={<Loading />}>
                  <Switch>
                  <Route exact path='/' component={Scoreboard} />
                  <Route exact path='/game' component={GameDetails} />
                  <Route exact path='/create' component={GameForm} />
                  <Route exact path='/stats' component={Stats} />
                  <Route render={() => <Error />} />
                  </Switch>
                </React.Suspense>
              </div>              
            </React.Fragment>
          </Router>
        </MuiThemeProvider>
      </HttpsRedirect>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import './Header.css';
import Games from './Games'
import Header from './Header';
import GameForm from './features/game-form'

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />
        <br />
        <Games />
        <br />
        <GameForm />
      </div>
    );
  }
}

export default App;

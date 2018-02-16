import React, { Component } from 'react';
import './App.css';
import './Header.css';
import Games from './Games.js'
import Header from './Header.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Where We Stuck',
    };
  }

  render() {
    let title = this.state.title;
    return (
      <div>
        <Header />
        <Games />
      </div>
    );
  }
}

export default App;

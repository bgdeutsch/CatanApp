import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Where We Stuck',
      players: []
    }
  }

componentDidMount() {
  console.log('doing the mount');
}

  render() {
    let title = this.state.title;
    return (
      <div className="App">
        <h1>
          {title}
        </h1>
      </div>
    );
  }
}

export default App;

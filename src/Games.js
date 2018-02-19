import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Games extends Component {

  constructor() {
    super();
    this.state = {
      games: [],
    };
  }

componentDidMount() {
  axios.get('http://localhost:3000/api/games/')
    .then(results => {
      this.setState({ games: results.data })
    })
    .catch(err => {
      console.log(err);
    })
}

  render() {
    console.log(this.state.games);
    return (
      <div>
        {
          this.state.games.map((game, index) => {
            return (
              <ul key={index}>
                <li>Game Type: {game.gametype_name}</li>
                <li>Winner: {game.name}</li>
                <li>Date: {game.creation_time.toString()}</li>
              </ul>
            );
          })
        }
      </div>
    );
  }
}

export default Games;
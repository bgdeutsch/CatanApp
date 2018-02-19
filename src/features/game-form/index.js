import React, { Component } from 'react';
import ParticipantForm from '../participant-form'
import GameTypeDropdown from './game-type-dropdown'
import axios from 'axios';

export default class GameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedGameTypeId: -1,
      allGameTypes: [],
    };
    this.handleGameTypeChange = this.handleGameTypeChange.bind(this)
    this.addGame = this.addGame.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/gametypes/')
    .then(results => {
      this.setState({
        allGameTypes: results.data,
        selectedGameTypeId: results.data[0].gametypeid,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleGameTypeChange(event) {
    this.setState({selectedGameTypeId: event.target.value});
  }

  addGame(event) {
    event.preventDefault();
    let gameTypeId = this.state.selectedGameTypeId;
    axios.post('http://localhost:3000/api/addGame/', {
      gametypeid: gameTypeId
    })
    .then(results => {
      console.log('successful post');
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="center">
        <form ref="gameForm">
          <label htmlFor="gametypeid">Choose Game Type:</label> 
          <GameTypeDropdown
            handleChange={this.handleGameTypeChange}
            allGameTypes={this.state.allGameTypes}
          />
          <button onClick={this.addGame}>Add Game</button>
        </form>
        <ParticipantForm />

      </div>
    );
  }
}

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
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
    
    this.handleGameTypeChange = this.handleGameTypeChange.bind(this);
    this.initGame = this.initGame.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/gametypes/')
    .then(results => {
      this.setState({
        allGameTypes: results.data,
        selectedGameTypeId: results.data[0].gametypeid,
      })
      console.log('When mounting the selected type id is..' + this.state.selectedGameTypeId);
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleGameTypeChange(event) {
    this.setState({selectedGameTypeId: event.target.value});
  }

  initGame(event) {
    event.preventDefault();
    let gameTypeId = this.state.selectedGameTypeId;

    axios.post('http://localhost:3000/api/initGame/', {
      gametypeid: gameTypeId
    })
    .then(results => {
      console.log('successfully initialized game!');
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="center">
        <h3 className="text-center">New Game</h3>
        <form ref="gameForm">
          <label htmlFor="selectedGameTypeId" className="label-text">Choose Game Type:</label>
          <br /> 
          <GameTypeDropdown
            handleChange={this.handleGameTypeChange}
            allGameTypes={this.state.allGameTypes}
          />
          <RaisedButton label="Continue" onClick={this.initGame} />
        </form>
        <br />
        <ParticipantForm />
        <br /> 
      </div>
    );
  }
}

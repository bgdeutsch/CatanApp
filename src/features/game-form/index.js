import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ParticipantForm from '../participant-form'
import GameTypeDropdown from './game-type-dropdown'
import axios from 'axios';
import {
    HashRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

export default class GameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedGameTypeId: -1,
      allGameTypes: [],
      redirect: false,
      error: false
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
      this.setState({ error: true });
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
      this.setState({ redirect: true });
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: "/addPlayer",
          state: { success: this.state.redirect }
        }} />
      )
    }
    return (
      <div>
        <h3 className="text-center">New Game</h3>
        <form ref="gameForm">
          <div className="form-container text-center">
            <label htmlFor="selectedGameTypeId" className="label-text text-center">
              First, choose a Game Type:
            </label>
            <br /> 
            <GameTypeDropdown
              handleChange={this.handleGameTypeChange}
              allGameTypes={this.state.allGameTypes}
              selectedGameTypeId={this.state.selectedGameTypeId}
            />
            <br />
            <br />
            <RaisedButton label="Continue" 
                          fullWidth={true}
                          onClick={this.initGame} />
          </div>
        </form>
        <br /> 
      </div>
    );
  }
}

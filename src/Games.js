import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import crown from './crown.png';

class Games extends Component {

  constructor() {
    super();
    this.state = {
      games: [],
    };

    this.trimDateTime = this.trimDateTime.bind(this)
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

trimDateTime(string) {
  return string.substring(0, string.indexOf('T'));
}

  render() {

    const cardTextStyle={
      fontWeight: 'bold'
    }

    const cardStyle={
      margin:'5px'
    }
    
    const flexContainerStyle={
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }

    return (
      <div style={flexContainerStyle}>
        {
          this.state.games.map((game, index) => {
            return (
              <Card key={index} style={cardStyle}>
                <CardHeader 
                  title={game.gametype_name}
                  subtitle={this.trimDateTime(game.creation_time.toString())}>
                </CardHeader>
                <CardText style={cardTextStyle}>
                  <span><img src={crown} alt="Winner" /> {game.name}</span>
                </CardText>
              </Card>
            );
          })
        }
      </div>
    );
  }
}

export default Games;
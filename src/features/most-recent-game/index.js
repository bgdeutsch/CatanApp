/*import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export default class MostRecentGame extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mostRecentGame: {},
		};
	}

	componentDidMount() {
    axios.get('http://localhost:3000/api/mostrecentgame/')
    .then(results => {
			console.log(results.data);
      // this.setState({
      //   mostRecentGame: results.data,
      // })
    })
    .catch(err => {
      console.log(err);
    })
  }

	render() {
    return (
			<Card>

			</Card>
		);
	}
}*/
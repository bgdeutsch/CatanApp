import React from 'react';
import axios from 'axios';
import GameTypeForm from '../game-type-form';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

export default class GameForm extends React.Component {
	
	constructor() {
		super();

		this.state = {
			finished: false,
    	stepIndex: 0,
			allGameTypes: []
		};
	};

	componentDidMount() {
		axios.get('http://localhost:3000/api/gameTypes')
			.then(response => {
				this.setState({
					allGameTypes: response.data,
					selectedGameTypeID: response.data[0].gametype_id
				});
			})
			.catch(error => {
				console.log(error);
		});
	}

	handleNext = () => {
    const {stepIndex} = this.state;

		if (stepIndex === 0) {
			console.log("clicked step 1 - choose game type");
		}else if (stepIndex === 1) {
			console.log("clicked step 2 - add players")
		}
		else {
			console.log("completing game");
		}

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

	render() {
    return (
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
				<Stepper activeStep={this.state.stepIndex} orientation="vertical">
					<Step>
						<StepLabel>Choose Game Type:</StepLabel>
						<StepContent>
							<GameTypeForm allGameTypes={this.state.allGameTypes} />
						</StepContent>
						<button label="Next" onClick={this.handleNext}>
							Next
						</button>
					</Step>
				</Stepper>
      </div>
    );
  }
}
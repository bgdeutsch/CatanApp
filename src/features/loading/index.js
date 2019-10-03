import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core';

// withStyles() is a HOC that will inject a style override prop into LinearProgress
const StyledLinearProgress = withStyles({
  root: {
    margin: '0 auto',
    marginTop: '150px',
    height: 10,
    width: '90%'
  }
})(LinearProgress)

export default class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      completed: 0
    }
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 2000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100})
    } else {
      this.setState({completed})
      const diff = Math.random() * 10
      this.timer = setTimeout(() => this.progress(completed + diff), 500)
    }
  }

  render() {
    return (
      <StyledLinearProgress 
        variant="determinate"       
        value={this.state.completed}
      />      
    )
  }
}

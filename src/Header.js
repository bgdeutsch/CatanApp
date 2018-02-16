import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';

class Header extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Where We Stuck?',
    };
  }

  render() {
    let title = this.state.title;
    return (
        <div className="header">
            <h2>{title}</h2>
            <Button>+</Button>
        </div>
    );
  }
}

export default Header;
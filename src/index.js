import React, { Component } from 'react';
import { render } from 'react-dom';

const Game = require('./Game').default;

class Main extends Component {
  render() {
    return (
      <Game width="640" height= "480" />
    );
  }
}

document.body.onload = function() {
  render(<Main />, document.getElementById('root'));
}

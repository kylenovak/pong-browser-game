import React, { Component } from 'react';

import './styles/home.css';

class Home extends Component {
  render() {
    return (
      <div id="home" className="screen">
        <h1>Pong</h1>
        <button id="play" onMouseDown={this.props.handleMouseDown}>Play</button>
        <button id="quit" onMouseDown={this.props.handleMouseDown}>Quit</button>
      </div>
    );
  }
}

export default Home;

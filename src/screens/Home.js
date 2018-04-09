import React, { Component } from 'react';

import Header from './partials/Header';

class Home extends Component {
  render() {
    return (
      <div id="home" className={`screen ${this.props.show ? '' : 'hide'}`}>
        <Header />
        <button id="play-btn" onMouseDown={this.props.handleButtonClick}>Play</button>
        <button id="difficulty-btn" onMouseDown={this.props.handleButtonClick}>Difficulty</button>
        <button id="about-btn" onMouseDown={this.props.handleButtonClick}>About</button>
      </div>
    );
  }
}

export default Home;

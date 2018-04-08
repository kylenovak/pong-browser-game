import React, { Component } from 'react';

import Header from './Header';

import './styles/home.css';

class Home extends Component {
  render() {
    return (
      <div id="home" className={`screen ${this.props.show ? '' : 'hide'}`}>
        <Header />
        <button id="play-btn" onMouseDown={this.props.handleButtonClick}>Play</button>
        <button id="settings-btn" onMouseDown={this.props.handleButtonClick}>Settings</button>
        <button id="about-btn" onMouseDown={this.props.handleButtonClick}>About</button>
      </div>
    );
  }
}

export default Home;

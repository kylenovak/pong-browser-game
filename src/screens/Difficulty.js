import React, { Component } from 'react';

import Header from './partials/Header';
import Footer from './partials/Footer';

class Difficulty extends Component {
  render() {
    return (
      <div id="difficulty" className={`screen ${this.props.show ? '' : 'hide'}`}>
        <Header />
        <h2>Difficulty</h2>
        <ul>
          <li>
            <button id="easy-btn"
              className={this.props.difficultyLevel === 'easy' ? 'active' : ''}
              onClick={this.props.handleDifficultySelect}>
              Easy
            </button>
          </li>
          <li>
            <button id="medium-btn"
              className={this.props.difficultyLevel === 'medium' ? 'active' : ''}
              onClick={this.props.handleDifficultySelect}>
              Medium
            </button>
          </li>
          <li>
            <button id="hard-btn"
              className={this.props.difficultyLevel === 'hard' ? 'active' : ''}
              onClick={this.props.handleDifficultySelect}>
              Hard
            </button>
          </li>
        </ul>
        <Footer handleButtonClick={this.props.handleButtonClick} />
      </div>
    );
  }
}

export default Difficulty;

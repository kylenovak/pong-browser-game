import React, { Component } from 'react';

import Score from './partials/Score';
import End from './partials/End';

class Play extends Component {
  render() {
    return (
      <div id="play"
        className={`screen ${this.props.show ? '' : 'hide'}`}
        onMouseMove={this.props.handleMouseMove}
        style={{cursor: 'none'}}
      >

        <Score gameScore={this.props.gameScore} />

        <End gameOver={this.props.gameOver}
          gameScore={this.props.gameScore}
          handleButtonClick={this.props.handleButtonClick} />

        <canvas id="canvas"
          width={this.props.width}
          height={this.props.height}
        >
        </canvas>
      </div>
    );
  }
}

export default Play;

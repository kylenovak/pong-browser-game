import React, { Component } from 'react';

import Score from './partials/Score';

class Play extends Component {
  render() {
    return (
      <div id="play"
        className={`screen ${this.props.show ? '' : 'hide'}`}
        onMouseMove={this.props.handleMouseMove}
        style={{cursor: 'none'}}
      >
        <Score />
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

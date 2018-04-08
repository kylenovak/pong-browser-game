import React, { Component } from 'react';

import Score from './Score';

class Play extends Component {
  render() {
    return (
      <div id="play" className={`screen ${this.props.show ? '' : 'hide'}`}>
        <Score />
        <canvas id="canvas"
          width={this.props.width}
          height={this.props.height}
          onMouseMove={this.props.handleMouseMove}
        >
        </canvas>
      </div>
    );
  }
}

export default Play;

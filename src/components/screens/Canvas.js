import React, { Component } from 'react';

import './styles/canvas.css';

class Canvas extends Component {
  render() {
    return (
      <canvas id="pongBrowserGameCanvas"
        className="pongBrowserGameScreen"
        width={this.props.width}
        height={this.props.height}
        onMouseMove={this.props.handleMouseMove}
      >
      </canvas>
    );
  }
}

export default Canvas;

import React, { Component } from 'react';

class End extends Component {
  constructor(props) {
    super(props);

    this.endStyle = {
      height: '100%',
      cursor: 'default'
    };

    this.messageStyle = {
      position: 'absolute',
      top: '25%',
      background: 'rgba(0, 0, 0, 0.75)'
    };

    this.buttonStyle = {
      marginTop: '20px'
    }
  }

  render() {
    return (
      <div id="end" className={`screen ${this.props.gameOver ? '' : 'hide'}`} style={this.endStyle}>
        <div style={this.messageStyle}>
          <h2>Game Over</h2>
          <p style={{margin: '0 25%'}}>
            <span>{this.props.gameScore.player > this.props.gameScore.computer ? 'You Win!' : 'You Lose!'}</span>
            <button id="retry-btn" style={this.buttonStyle} onMouseDown={this.props.handleButtonClick}>Try Again?</button>
            <button id="end-btn" onMouseDown={this.props.handleButtonClick}>Home</button>
          </p>
        </div>
      </div>
    );
  }
}

export default End;

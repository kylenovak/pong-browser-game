import React, { Component } from 'react';

class Score extends Component {
  constructor(props) {
    super(props);

    this.scoreStyle = {
      position: 'absolute',
      height: 'auto',
      top: '30px',
      fontSize: '28px'
    };

    this.computerScoreStyle = {
      paddingRight: '30px'
    };

    this.playerScoreStyle = {
      paddingLeft: '30px'
    };
  }

  render() {
    return (
      <div id="score" className="screen" style={this.scoreStyle}>
        <span style={this.computerScoreStyle}>{this.props.gameScore.computer}</span>
        <span style={this.playerScoreStyle}>{this.props.gameScore.player}</span>
      </div>
    );
  }
}

export default Score;

import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.footerStyle = {
      position: 'absolute',
      width: '100%',
      bottom: '40px',
      height: 'auto'
    };

    this.buttonStyle = {
      margin: 0
    };
  }
  render() {
    return (
      <footer style={this.footerStyle}>
        <button id="return-btn" style={this.buttonStyle} onMouseDown={this.props.handleButtonClick}>Return</button>
      </footer>
    );
  }
}

export default Footer;

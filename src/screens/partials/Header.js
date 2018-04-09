import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.headerStyle = {
      fontSize: '20px',
      marginBottom: '60px'
    };
  }

  render() {
    return (
      <header style={this.headerStyle}>
        <h1>Pong</h1>
      </header>
    );
  }
}

export default Header;

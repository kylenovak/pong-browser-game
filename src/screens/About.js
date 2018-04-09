import React, { Component } from 'react';

import Header from './partials/Header';
import Footer from './partials/Footer';

class About extends Component {
  constructor(props) {
    super(props);

    this.paragraphStyle = {
      margin: '0 25%'
    };
  }

  render() {
    return (
      <div id="about" className={`screen ${this.props.show ? '' : 'hide'}`}>
        <Header />
        <h2>About</h2>
        <p style={this.paragraphStyle}>This is a remake, built by <a href="https://www.kylejnovak.com" target="_blank">Kyle J. Novak</a> with ECMAScript 2015 (ES6) and ReactJS, of the classic Pong game.</p>
        <Footer handleButtonClick={this.props.handleButtonClick} />
      </div>
    );
  }
}

export default About;

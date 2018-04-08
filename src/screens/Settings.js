import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

class Settings extends Component {
  render() {
    return (
      <div id="settings" className={`screen ${this.props.show ? '' : 'hide'}`}>
        <Header />
        <Footer handleButtonClick={this.props.handleButtonClick} />
      </div>
    );
  }
}

export default Settings;

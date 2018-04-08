import React, { Component } from 'react';
import { render } from 'react-dom';

import Game from './Game';

class Main extends Component {
  render() {
    return (
      <div id="pongBrowserGameWrapper">
        <Game width="640" height= "480" />
      </div>
    );
  }
}

document.body.onload = function() {
  render((
    <Main />
  ), document.getElementById('root'));
}

export default Main;

import React, { Component } from 'react';

// import screen components
import Play from './screens/Play';
import Home from './screens/Home';
import Settings from './screens/Settings';
import About from './screens/About';

// import styles
import './styles/game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeScreenId: 'home'
    };

    this.loop = this.loop.bind(this);
    this.handleCanvasScreenMouseMove = this.handleCanvasScreenMouseMove.bind(this);
    this.handleScreenButtonClick = this.handleScreenButtonClick.bind(this);

    // mouse coords
    this.x = 0;
    this.y = 0;

    // time it took to draw one frame
    this.prevTimestamp = 0;

    // define max game speed in pixels
    const pixelsPerSecond = 100;
    const millisecondsInSecond = 1000;
    this.pixelsPerMillisecond = pixelsPerSecond / millisecondsInSecond;
  }

  componentDidMount() {
    // setup game once the UI has rendered
    this.init();
  }

  init() {
    this.canvas = document.getElementById('canvas');
    this.canvasContext = this.canvas.getContext('2d');
    this.canvasRect = this.canvas.getBoundingClientRect();
  }

  logic() {
    // TODO: handle game logic
  }

  draw(timestamp) {
    // interpolate the number of pixels to move by
    let pixelOffset = this.pixelsToMoveBy(timestamp);
    // TODO: canvas draw
  }

  loop(timestamp = 0) {
    // handle game logic
    this.logic();
    // draw the game
    this.draw(timestamp);

    if (!this.gameEnded) {
      // keep animating if the game hasn't ended
      this.animationFrame = window.requestAnimationFrame(this.loop);
    }
    else {
      window.cancelAnimationFrame(this.animationFrame);
      this.setState({activeScreenId: 'home'});
    }
  }

  pixelsToMoveBy(timestamp) {
    const timeInMilliseconds = timestamp - this.prevTimestamp;
    this.prevTimestamp = timestamp;

    return timeInMilliseconds * this.pixelsPerMillisecond;
  }

  handleCanvasScreenMouseMove(e) {
    this.x = e.clientX - this.canvasRect.x;
    this.y = e.clientY - this.canvasRect.y;
  }

  handleScreenButtonClick(e) {
    let activeScreenId = '';

    const buttonId = e.target.id;

    switch (buttonId) {
      case 'play-btn':
        activeScreenId = 'play';
        // reset for new game
        this.gameEnded = false;
        // start game loop
        this.loop();
        break;
      case 'settings-btn':
        activeScreenId = 'settings';
        break;
      case 'about-btn':
        activeScreenId = 'about';
        break;
      case 'return-btn':
        // return to the home screen
        activeScreenId = 'home';
        break;
      default:
        // default screen is home
        activeScreenId = 'home';
        break;
    }

    this.setState({activeScreenId: activeScreenId});
  }

  render() {
    return (
      <div id="wrapper">
        <div id="container" style={{width: `${this.props.width}px`, height: `${this.props.height}px`}}>
          <Play show={this.state.activeScreenId === 'play'}
            handleMouseMove={this.handleCanvasScreenMouseMove}
            width={this.props.width}
            height={this.props.height}
          />

          <Home show={this.state.activeScreenId === 'home'}
            handleButtonClick={this.handleScreenButtonClick}/>

          <Settings show={this.state.activeScreenId === 'settings'}
            handleButtonClick={this.handleScreenButtonClick} />

          <About show={this.state.activeScreenId === 'about'}
            handleButtonClick={this.handleScreenButtonClick} />
        </div>
      </div>
    );
  }
}

export default Game;

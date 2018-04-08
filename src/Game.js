import React, { Component } from 'react';

// import screen components
import Canvas from './screens/Canvas';
import Score from './screens/Score';
import Home from './screens/Home';

// import styles
import './styles/game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.loop = this.loop.bind(this);
    this.handleCanvasScreenMouseMove = this.handleCanvasScreenMouseMove.bind(this);
    this.handleHomeScreenMouseDown = this.handleHomeScreenMouseDown.bind(this);

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

    this.hideAllScreens();

    // default to showing the home screen
    this.showScreen('home');
  }

  logic() {
    // TODO: handle game logic
  }

  draw(timestamp) {
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
      this.showScreen('home');
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

  handleHomeScreenMouseDown(e) {
    let buttonId = e.target.id;

    switch (buttonId) {
      case 'play':
        this.gameEnded = false;
        this.hideAllScreens();
        this.showScreen('canvas');
        this.showScreen('score');
        // start game loop
        this.loop();
        break;
      case 'quit':
        this.gameEnded = true;
        break;
      default:
        break;
    }
  }

  showScreen(id) {
    let screen = document.getElementById(id);
    screen.style.display = 'block';
  }

  hideScreen(id) {
    let screen = document.getElementById(id);
    screen.style.display = 'none';
  }

  hideAllScreens() {
    let screens = document.getElementsByClassName('screen');
    for (let i = 0; i < screens.length; i++) {
      screens[i].style.display = 'none';
    }
  }

  render() {
    return (
      <div id="wrapper">
        <div id="container" style={{width: `${this.props.width}px`, height: `${this.props.height}px`}}>
          <Canvas handleMouseMove={this.handleCanvasScreenMouseMove}
            width={this.props.width}
            height={this.props.height}
          />

          <Score />

          <Home handleMouseDown={this.handleHomeScreenMouseDown} />
        </div>
      </div>
    );
  }
}

export default Game;

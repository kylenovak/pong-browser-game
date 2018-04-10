import React, { Component } from 'react';

// import screen components
import Play from './screens/Play';
import Home from './screens/Home';
import Difficulty from './screens/Difficulty';
import About from './screens/About';

// import styles
import './styles/game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    // initial game states
    this.gameOver = false;
    this.state = {
      activeScreenId: 'home',
      difficultyLevel: 'medium'
    };

    // bind methods and event handlers
    this.loop = this.loop.bind(this);
    this.handleCanvasScreenMouseMove = this.handleCanvasScreenMouseMove.bind(this);
    this.handleScreenButtonClick = this.handleScreenButtonClick.bind(this);
    this.handleDifficultySelect = this.handleDifficultySelect.bind(this);

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

    // canvas draw styles
    this.canvasContext.fillStyle = '#fff';
    this.canvasContext.strokeStyle = '#fff';
    this.canvasContext.lineWidth = 5;

    // table constants
    this.verticalPadding = 20;
    this.horizontalPadding = 25;
    this.lineWidth = 5;
    this.centerLineX = (this.props.width / 2) - (this.lineWidth / 2);
    this.lineDashSize = 5;
    this.linSpaceSize = 3;

    // game piece constants
    this.paddleWidth = 10;
    this.paddleHeight = 50;
    this.initialPaddleY = (this.props.height / 2) - (this.paddleHeight / 2);
    this.computerPaddleX = this.horizontalPadding*2 - this.paddleWidth;
    this.playerPaddleX = this.props.width - this.horizontalPadding*2;
  }

  logic() {
    // TODO: handle game logic
  }

  draw(timestamp) {
    // interpolate the number of pixels to move by
    let pixelOffset = this.pixelsToMoveBy(timestamp);

    // draw the table background
    this.drawTableBackground();

    // draw game pieces
    this.drawComputerPaddle();
    this.drawPlayerPaddle();
    this.drawBall();
  }

  drawTableBackground() {
    // draw table top border
    this.canvasContext.fillRect(this.horizontalPadding, this.verticalPadding, this.props.width - this.horizontalPadding*2, this.lineWidth);
    // draw table bottom border
    this.canvasContext.fillRect(this.horizontalPadding, this.props.height - (this.verticalPadding + this.lineWidth), this.props.width - this.horizontalPadding*2, this.lineWidth);
    // draw table center line
    this.canvasContext.setLineDash([this.lineDashSize, this.linSpaceSize]);
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(this.centerLineX, this.verticalPadding + this.lineWidth);
    this.canvasContext.lineTo(this.centerLineX, this.props.height - (this.verticalPadding + this.lineWidth));
    this.canvasContext.stroke();
  }

  drawComputerPaddle(y) {
    if (y === undefined) {
      // set initial y position if y is not passed in
      y = this.initialPaddleY;
    }
    // draw the computer's paddle
    this.canvasContext.fillRect(this.computerPaddleX, y, this.paddleWidth, this.paddleHeight);
  }

  drawPlayerPaddle(y) {
    if (y === undefined) {
      // set initial y position if y is not passed in
      y = this.initialPaddleY;
    }
    // draw the player's paddle
    this.canvasContext.fillRect(this.playerPaddleX, y, this.paddleWidth, this.paddleHeight);
  }

  drawBall(x, y) {
    const size = 10; // width and height of the ball
    if (x === undefined && y === undefined) {
      // set initial x and y coordinates if none are passed in
      x = (this.props.width / 2) - (size / 2) - (this.lineWidth / 2);
      y = (this.props.height / 2) - (size / 2);
    }
    // draw the ball
    this.canvasContext.fillRect(x, y, size, size);
  }

  drawScore() {
    // TODO
  }

  loop(timestamp = 0) {
    // handle game logic
    this.logic();
    // draw the game
    this.draw(timestamp);

    if (!this.gameOver) {
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
        this.gameOver = false;
        // start game loop
        this.loop();
        break;
      case 'difficulty-btn':
        activeScreenId = 'difficulty';
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

  handleDifficultySelect(e) {
    let difficultyLevel = '';

    const difficultyBtnId = e.target.id;

    switch(difficultyBtnId) {
      case 'easy-btn':
        difficultyLevel = 'easy';
        break;
      case 'medium-btn':
        difficultyLevel = 'medium';
        break;
      case 'hard-btn':
        difficultyLevel = 'hard';
        break;
      default:
        // default to medium difficulty
        difficultyLevel = 'medium';
        break;
    }

    this.setState({difficultyLevel: difficultyLevel});
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
            handleButtonClick={this.handleScreenButtonClick} />

          <Difficulty show={this.state.activeScreenId === 'difficulty'}
            handleButtonClick={this.handleScreenButtonClick}
            handleDifficultySelect={this.handleDifficultySelect}
            difficultyLevel={this.state.difficultyLevel}
          />

          <About show={this.state.activeScreenId === 'about'}
            handleButtonClick={this.handleScreenButtonClick} />
        </div>
      </div>
    );
  }
}

export default Game;

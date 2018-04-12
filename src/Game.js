import React, { Component } from 'react';

// import screen components
import Play from './screens/Play';
import Home from './screens/Home';
import Difficulty from './screens/Difficulty';
import About from './screens/About';

// import entities
import Ball from './entities/Ball';
import Paddle from './entities/Paddle';

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

    // timestamp the previous frame was drawn at
    this.prevTime = 0;
  }

  componentDidMount() {
    // setup game once the UI has rendered
    this.init();
  }

  init() {
    this.canvas = document.getElementById('canvas');
    this.canvasContext = this.canvas.getContext('2d');
    // gets the position of the canvas relative to the viewport
    this.canvasRect = this.canvas.getBoundingClientRect();

    // canvas draw styles
    this.canvasContext.fillStyle = '#fff';
    this.canvasContext.strokeStyle = '#fff';
    this.canvasContext.lineWidth = 5;

    // table constants
    this.tablePadding = 20;
    this.lineWidth = 5;
    this.centerLineX = (this.canvas.width / 2) - (this.lineWidth / 2);
    this.lineDashSize = 5;
    this.linSpaceSize = 3;

    // init game entities
    this.initPaddles();
    this.initBall();
  }

  initPaddles() {
    const paddleWidth = 10;
    const paddleHeight = 50;

    // set width and height for paddles
    Paddle.width = paddleWidth;
    Paddle.height = paddleHeight;

    const initialPaddleY = (this.canvas.height / 2) - (paddleHeight / 2);
    const playerPaddleX = this.canvas.width - this.tablePadding - paddleWidth;
    const playerPaddleY = initialPaddleY;
    const computerPaddleX = this.tablePadding;
    const computerPaddleY = initialPaddleY;

    this.playerPaddle = new Paddle(playerPaddleX, playerPaddleY);
    this.computerPaddle = new Paddle(computerPaddleX, computerPaddleY);
  }

  initBall() {
    const size = 10; // square size in pixels
    const speed = 300; // speed in pixels per seconds

    // set the ball in the center of the canvas
    const x = (this.canvas.width / 2) - (size / 2) - (this.lineWidth / 2);
    const y = (this.canvas.height / 2) - (size / 2);

    const angle = Math.floor(Math.random() * 31) + 15; // angle can be 15 - 45

    // definine table bounds for the ball
    const tablePerimeter = {
      top: this.tablePadding + this.lineWidth,
      bottom: this.canvas.height - (this.tablePadding + this.lineWidth) - size,
      left: 0,
      right: 0
    };

    this.ball = new Ball(x, y, speed, size, angle, tablePerimeter);
  }

  loop(time = 0) {
    // udpate entity states
    this.update(time);

    // draw the game
    this.draw();

    if (!this.gameOver) {
      // keep calling loop if the game isn't over
      this.animationFrame = window.requestAnimationFrame(this.loop);
    }
    else {
      // stop the loop when the game is over
      window.cancelAnimationFrame(this.animationFrame);
      // go to the home screen when the game is over
      this.setState({activeScreenId: 'home'});
    }
  }

  update(time) {
    if (this.prevTime == 0) {
      this.prevTime = time;
    }

    // get the time difference between frames
    const deltaT = time - this.prevTime;

    // update entity states
    this.ball.update(deltaT);

    this.prevTime = time;
  }

  draw() {
    // clear the canvas before drawing
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw table top border
    this.canvasContext.fillRect(this.tablePadding, this.tablePadding, this.canvas.width - this.tablePadding*2, this.lineWidth);
    // draw table bottom border
    this.canvasContext.fillRect(this.tablePadding, this.canvas.height - (this.tablePadding + this.lineWidth), this.canvas.width - this.tablePadding*2, this.lineWidth);
    // draw table center line
    this.canvasContext.setLineDash([this.lineDashSize, this.linSpaceSize]);
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(this.centerLineX, this.tablePadding + this.lineWidth);
    this.canvasContext.lineTo(this.centerLineX, this.canvas.height - (this.tablePadding + this.lineWidth));
    this.canvasContext.stroke();

    // draw the ball
    this.canvasContext.fillRect(this.ball.x, this.ball.y, this.ball.size, this.ball.size);

    // draw the computer's paddle
    this.canvasContext.fillRect(this.computerPaddle.x, this.computerPaddle.y, Paddle.width, Paddle.height);

    // draw the player's paddle
    this.canvasContext.fillRect(this.playerPaddle.x, this.playerPaddle.y, Paddle.width, Paddle.height);
  }

  handleCanvasScreenMouseMove(e) {
    // set mouse y to the player paddle y coordinate
    this.playerPaddle.y = e.clientY - this.canvasRect.y;
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

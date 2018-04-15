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

    // whoever reaches 10 points first wins
    this.playTo = 10;

    this.gameOver = false;
    this.gameScore = {
      player: 0,
      computer: 0
    };

    this.state = {
      activeScreenId: 'home',
      difficultyLevel: 'medium',
      gameScore: this.gameScore,
      gameOver: this.gameOver
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
    this.initBall();
    this.initPaddles();
  }

  initPaddles() {
    const paddleWidth = 10;
    const paddleHeight = 50;

    const initialPaddleY = (this.canvas.height / 2) - (paddleHeight / 2);
    const playerPaddleX = this.canvas.width - this.tablePadding - paddleWidth;
    const playerPaddleY = initialPaddleY;
    const computerPaddleX = this.tablePadding;
    const computerPaddleY = initialPaddleY;

    Paddle.difficultyLevel = this.state.difficultyLevel;

    this.playerPaddle = new Paddle(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight, this.ball);
    this.computerPaddle = new Paddle(computerPaddleX, computerPaddleY, paddleWidth, paddleHeight, this.ball, true);
  }

  initBall() {
    const size = 10; // square size in pixels

    // set the ball in the center of the canvas
    const x = (this.canvas.width / 2) - (size / 2) - (this.lineWidth / 2);
    const y = (this.canvas.height / 2) - (size / 2);

    // define bounds for the ball
    const bounds = {
      top: this.tablePadding + this.lineWidth,
      bottom: this.canvas.height - (this.tablePadding + this.lineWidth) - size,
      left: -size,
      right: this.canvas.width
    };

    this.ball = new Ball(x, y, this.state.difficultyLevel, size, bounds);
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
    if (this.ball.score(this.gameScore)) {
      this.setState({gameScore: this.gameScore});
    }
    this.playerPaddle.update();
    this.computerPaddle.update();

    if (this.gameScore.player >= this.playTo) {
      this.gameOver = true;
      this.setState({gameOver: true});
    }
    else if (this.gameScore.computer >= this.playTo) {
      this.gameOver = true;
      this.setState({gameOver: true});
    }

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
    this.canvasContext.fillRect(this.computerPaddle.x, this.computerPaddle.y, this.computerPaddle.width, this.computerPaddle.height);

    // draw the player's paddle
    this.canvasContext.fillRect(this.playerPaddle.x, this.playerPaddle.y, this.playerPaddle.width, this.playerPaddle.height);
  }

  reset() {
    // reset game
    this.gameOver = false;
    this.gameScore.player = 0;
    this.gameScore.computer = 0;
    this.setState({
      gameScore: this.gameScore,
      gameOver: this.gameOver
    });
    this.prevTime = 0;
  }

  handleCanvasScreenMouseMove(e) {
    // move player paddle y to mouse y
    this.playerPaddle.move(e.clientY - this.canvasRect.y);
  }

  handleScreenButtonClick(e) {
    let activeScreenId = '';

    const buttonId = e.target.id;

    switch (buttonId) {
      case 'play-btn':
        activeScreenId = 'play';
        // start game loop
        this.loop();
        break;
      case 'difficulty-btn':
        activeScreenId = 'difficulty';
        break;
      case 'about-btn':
        activeScreenId = 'about';
        break;
      case 'retry-btn':
        activeScreenId = 'play';
        this.reset();
        this.loop();
        break;
      case 'end-btn':
        activeScreenId = 'home';
        this.reset();
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

    this.ball.difficultyLevel = difficultyLevel;
    this.ball.setSpeed(difficultyLevel);

    Paddle.difficultyLevel = difficultyLevel;

    this.setState({difficultyLevel: difficultyLevel});
  }

  render() {
    return (
      <div id="wrapper">
        <div id="container" style={{width: `${this.props.width}px`, height: `${this.props.height}px`}}>
          <Play show={this.state.activeScreenId === 'play'}
            handleMouseMove={this.handleCanvasScreenMouseMove}
            handleButtonClick={this.handleScreenButtonClick}
            width={this.props.width}
            height={this.props.height}
            gameScore={this.state.gameScore}
            gameOver={this.state.gameOver}
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

module.exports = Game;

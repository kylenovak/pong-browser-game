import React, { Component } from 'react';

// import services
import Mouse from './services/Mouse';

// import screen components
import Canvas from './components/screens/Canvas';

// import styles
import './styles/game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = { handleMouseMove: () => null };
  }

  componentDidMount() {
    // create mouse object for handling mouse events
    this.mouse = new Mouse('pongBrowserGameCanvas');

    this.setState({
      handleMouseMove: this.mouse.handleMouseMove
    });
  }

  render() {
    return (
      <div id="pongBrowserGameContainer" style={{width: `${this.props.width}px`, height: `${this.props.height}px`}}>
        <Canvas width={this.props.width} height={this.props.height} handleMouseMove={this.state.handleMouseMove} />
      </div>
    );
  }
}

export default Game;

let difficultyLevel = null;

class Paddle {
  constructor(x, y, width, height, ball, isComputer = false) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.y2 = this.y + this.height;

    this.ball = ball;

    // is this a computer player
    this.isComputer = isComputer;

    this.update = this.update.bind(this);
  }

  update() {
    this.collision();
    if (this.isComputer) {
      this.autoMove();
    }
  }

  move(y) {
    this.y = y;
    this.y2 = this.y + this.height;
  }

  autoMove() {
    let paddleSpeed = 1;
    let difficulty = Paddle.difficultyLevel;

    switch(difficulty) {
      case 'easy':
        // 0.2 - 0.6 speed
        paddleSpeed = (Math.floor(Math.random() * 41) + 20) / 100;
        break;
      case 'medium':
        // 0.4 - 0.8 speed
        paddleSpeed = (Math.floor(Math.random() * 41) + 40) / 100;
        break;
      case 'hard':
        // 0.5 - 0.9 speed
        paddleSpeed = (Math.floor(Math.random() * 41) + 50) / 100;
        break;
      default:
        break;
    }

    let centerBallY = this.ball.y - (this.height / 2) + (this.ball.size / 2);

    if (this.y > centerBallY || this.y2 < centerBallY) {
      this.y +=  (this.y > this.ball.y ? -1 : 1) * (this.ball.speed * paddleSpeed * 10);
      this.y2 = this.y + this.height;
    }
  }

  /**
  Check for a padlle collision with the ball

  return true if this paddle collides with the ball
  */
  collision() {
    // the direction the ball is moving (1 is right, -1 is left)
    let ballDirectionX = (this.ball.x > this.ball.prevX) ? 1 : -1;

    let x1 = this.x - (ballDirectionX * this.ball.size);
    let x2 = this.x - (ballDirectionX * this.ball.size);
    let x3 = this.ball.prevX;
    let x4 = this.ball.x;

    let y1 = this.y;
    let y2 = this.y2;
    let y3 = this.ball.prevY + (this.y > this.ball.prevY ? this.ball.size : 0);
    let y4 = this.ball.y + (this.y > this.ball.y ? this.ball.size : 0);

    let numeratorA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
    let numeratorB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
    let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    if (numeratorA == 0 && numeratorB == 0 && denominator == 0) {
      // lines are coincident
      return true;
    }
    else if (denominator == 0) {
      // lines are parallel
      return false;
    }

    let ua = numeratorA / denominator;
    let ub = numeratorB / denominator;

    // intersection point (x, y)
    //let x = x1 + ua * (x2 - x1);
    //let y = y1 + ua * (y2 - y1);

    // check if line segments intersect
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      this.ball.angle = Math.PI - this.ball.angle;
      // reset ball x since it collided with a paddle
      this.ball.prevX = this.x;
      this.ball.x = this.x - (ballDirectionX * this.ball.size);
      return true;
    }

    return false;
  }

  static set difficultyLevel(difficulty) {
    difficultyLevel = difficulty;
  }

  static get difficultyLevel() {
    return difficultyLevel;
  }
}

export default Paddle;

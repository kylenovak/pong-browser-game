class Ball {
  constructor(x, y, difficultyLevel, size, bounds) {
    // keep track of initial ball position for reseting
    this.initialX = x;
    this.initialY = y;

    // x and y coords of the ball
    this.x = x;
    this.y = y;

    // keep track of the ball's previous coords
    this.prevX = x;
    this.prevY = y;

    this.difficultyLevel = difficultyLevel;

    this.setSpeed(difficultyLevel);

    this.angle = Ball.angle();

    // size of the ball in pixels (width and height are the same)
    this.size = size;

    // the area the ball can stay within
    let top, bottom, left, right;
    ({top, bottom, left, right} = bounds);
    this.topBound = top;
    this.bottomBound = bottom;
    this.leftBound = left;
    this.rightBound = right;

    this.update = this.update.bind(this);
    this.score = this.score.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
  }

  setSpeed(difficultyLevel) {
    // ball speeds in pixels per second
    let speeds = {
      easy: 250,
      medium: 500,
      hard: 750
    };
    // convert the speed from pixels per second to pixels per millisecond
    this.speed = speeds[difficultyLevel] / 1000;
  }

  static angle() {
    // angle can be 15 - 45 degrees
    let angle = Math.floor(Math.random() * 31) + 15;
    // convert angle in degrees to angle in radians
    return angle * (Math.PI / 180);
  }

  update(deltaT) {
    this.move(deltaT);
    this.collision();
  }

  move(deltaT) {
    this.prevX = this.x;
    this.prevY = this.y;

    this.x += deltaT * this.speed * Math.cos(this.angle);
    this.y += deltaT * this.speed * Math.sin(this.angle);
  }

  collision() {
    // check that the ball is within bounds
    if (this.y < this.topBound) {
      this.angle = -this.angle;
      // reset since went out of bounds
      this.prevY = this.y;
      this.y = this.topBound;
    }
    if (this.y > this.bottomBound) {
      this.angle = -this.angle;
      // reset since went out of bounds
      this.prevY = this.y;
      this.y = this.bottomBound;
    }
  }

  score(score) {
    let didScore = false;

    if (this.x < this.leftBound) {
      // reset to center since player scored
      this.reset();

      score.player++;
      didScore = true;
    }

    if (this.x > this.rightBound) {
      // reset to center since computer scored
      this.reset();

      score.computer++;
      didScore = true;
    }

    return didScore;
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.prevX = this.x;
    this.prevY = this.y;
    this.angle = Ball.angle();
  }
}

export default Ball;

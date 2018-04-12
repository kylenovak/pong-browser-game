class Ball {
  constructor(x, y, speed, size, angle, tablePerimeter) {
    // x and y coordinates
    this.x = x;
    this.y = y;

    // convert the speed from pixels per second to pixels per millisecond
    this.speed = speed / 1000;

    // convert angle in degrees to angle in radians
    this.angle = angle * (Math.PI / 180);

    // size of the ball in pixels (width and height are the same)
    this.size = size;

    // the area the ball can stay within
    let top, bottom, left, right;
    ({top, bottom, left, right} = tablePerimeter);
    this.tableTop = top;
    this.tableBottom = bottom;
    this.tableLeft = left;
    this.tableRight = right;

    this.update = this.update.bind(this);
  }

  update(deltaT) {
    this.move(deltaT);
    this.collision();
  }

  move(deltaT) {
    this.x += deltaT * this.speed * Math.cos(this.angle);
    this.y += deltaT * this.speed * Math.sin(this.angle);
  }

  collision() {
    if (this.y > this.tableBottom) {
      this.angle = -this.angle;
      // reset since went out of bounds
      this.y = this.tableBottom;
    }
    if (this.y < this.tableTop) {
      this.angle = -this.angle;
      // reset since went out of bounds
      this.y = this.tableTop;
    }
  }
}

export default Ball;

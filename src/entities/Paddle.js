let width = 0;
let height = 0;

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static set width(w) {
    width = w;
  }

  static set height(h) {
    height = h;
  }

  static get width() {
    return width;
  }

  static get height() {
    return height;
  }
}

export default Paddle;

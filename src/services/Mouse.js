class Mouse {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvasRect = this.canvas.getBoundingClientRect();

    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.x = 0;
    this.y = 0;
  }

  handleMouseMove(e) {
    this.x = e.clientX - this.canvasRect.x;
    this.y = e.clientY - this.canvasRect.y;
  }

  get coords() {
    return { x: this.x, y: this.y };
  }
}

export default Mouse;

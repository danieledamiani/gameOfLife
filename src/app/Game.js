class Game {
  constructor({dom, grid, timeout = 500, arenaSize = 100} = {}) {
    if(!grid || !dom) {
      throw new Error('grid or arena is not defined');
    }
    this.dom = dom;
    this.grid = grid;
    this.timeout = timeout;
    this.rows = this.grid.getRowNumber();
    this.columns = this.grid.getColumnNumber();
    this.blockSize = arenaSize / this.rows;
    this.iterationTimeout;
    this.inPlay = false;
  }

  init() {
    this.grid.init();
    this.dom.reset();
    this.dom.draw(this.grid.getGrid(), this.rows, this.columns, this.blockSize);
  }

  update() {
    this.dom.update(this.grid.getGrid(), this.rows, this.columns);
    this.grid.iterate();
    this.updateIterationCounter(this.grid.getIterations());
  }

  play() {
    if (this.inPlay) { return; }
    this.inPlay = true;
    const iterate = () => {
      this.iterationTimeout = setTimeout(() => {
        this.update();
        iterate();
      }, this.timeout);
    }

    iterate();
  }

  pause() {
    this.inPlay = false;
    return clearTimeout(this.iterationTimeout);
  }

  next() {
    this.inPlay = false;
    clearTimeout(this.iterationTimeout);
    this.update();
  }

  updateIterationCounter(iterations) {
    this.dom.updateIterations(iterations);
  }
}

export default Game;

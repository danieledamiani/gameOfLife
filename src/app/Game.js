import Grid from './Grid';

class Game {
  constructor({timeout = 500, arenaSize = 100, rows = 2} = {}) {
    this.timeout = timeout;
    this.arenaSize = arenaSize;
    this.rows = this.columns = rows;
    this.blockSize = this.arenaSize / this.rows;
    this.iterationTimeout;
    this.inPlay = false;
    this.arena;
    this.grid;
  }

  draw(grid) {
    this.arena.innerHTML = null; // abstract html
    for(let rowsIterator = 0; rowsIterator < this.rows; rowsIterator ++) {
      for(let columnsIterator = 0; columnsIterator < this.columns; columnsIterator++) {
        let el = document.createElement('div'); // abstract html
        el.style.width = this.blockSize + 'px'; // abstract html
        el.style.height = this.blockSize + 'px'; // abstract html
        el.classList.add('cell'); // abstract html
        grid[rowsIterator][columnsIterator] ? el.classList.add('alive') : null;
        this.arena.appendChild(el);
      }
    }
  }

  updateArena(grid) {
    let cells = this.arena.getElementsByClassName('cell');
    // console.log(cells.length); // eslint-disable-line no-console
    let position = 0;
    for(let rowsIterator = 0; rowsIterator < this.rows; rowsIterator++) {
      for(let columnsIterator = 0; columnsIterator < this.columns; columnsIterator++) {
        // grid[rowsIterator][columnsIterator] ? el.classList.add('alive') : null;
        grid[rowsIterator][columnsIterator] ? cells[position].classList.add('alive') : cells[position].classList.remove('alive');
        // console.log(position, grid[rowsIterator][columnsIterator]); // eslint-disable-line no-console
        position++;
      }
    }
  }

  start() {
    this.arena = document.getElementById('arena'); // abstract html
    this.arena.style.width = this.arenaSize + 'px'; // abstract html
    this.arena.style.height = this.arenaSize + 'px'; // abstract html

    this.grid = new Grid(this.rows, this.columns); // needs DI
    this.grid.init();

    this.draw(this.grid.getGrid());
    this.play();
  }

  play() {
    if (this.inPlay) { return; }
    this.inPlay = true;
    const iterate = () => {
      this.iterationTimeout = setTimeout(() => {
        this.updateArena(this.grid.getGrid());
        this.updateIterationCounter(this.grid.getIterations());
        this.grid.iterate();
        iterate();
      }, this.timeout);
    }

    iterate();
  }

  pause() {
    this.inPlay = false;
    return clearTimeout(this.iterationTimeout);
  }

  // abstract html
  updateIterationCounter(iterations) {
    const iterationCounter = document.getElementById('iterations');
    iterationCounter.innerHTML = iterations;
  }
}

export default Game;

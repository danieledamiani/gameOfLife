import Grid from './Grid';

function Game(timeout, arenaSize, rows) {
  const TIMEOUT = timeout;
  const ARENA_SIZE = arenaSize;
  const ROWS = rows;
  const COLUMNS = rows;
  const BLOCK_SIZE = ARENA_SIZE / ROWS;

  let iterationTimeout;
  let inPlay = false;
  let arena;
  let grid;

  function draw(grid) {
    arena.innerHTML = null;
    for(let rowsIterator = 0; rowsIterator < ROWS; rowsIterator ++) {
      for(let columnsIterator = 0; columnsIterator < COLUMNS; columnsIterator++) {
        let el = document.createElement('div');
        el.style.width = BLOCK_SIZE + 'px';
        el.style.height = BLOCK_SIZE + 'px';
        el.classList.add('cell');
        grid[rowsIterator][columnsIterator] ? el.classList.add('alive') : null;
        arena.appendChild(el);
      }
    }
  }

  function updateArena(grid) {
    let cells = arena.getElementsByClassName('cell');
    console.log(cells.length); // eslint-disable-line no-console
    let position = 0;
    for(let rowsIterator = 0; rowsIterator < ROWS; rowsIterator++) {
      for(let columnsIterator = 0; columnsIterator < COLUMNS; columnsIterator++) {
        // grid[rowsIterator][columnsIterator] ? el.classList.add('alive') : null;
        grid[rowsIterator][columnsIterator] ? cells[position].classList.add('alive') : cells[position].classList.remove('alive');
        console.log(position, grid[rowsIterator][columnsIterator]); // eslint-disable-line no-console
        position++;
      }
    }
  }

  function start() {
    arena = document.getElementById('arena');
    arena.style.width = ARENA_SIZE + 'px';
    arena.style.height = ARENA_SIZE + 'px';

    grid = new Grid(ROWS, COLUMNS);
    grid.init();

    draw(grid.getGrid());
    play();
  }

  function play() {
    if (inPlay) { return; }
    inPlay = true;
    const iterate = function() {
      iterationTimeout = setTimeout(function() {
        updateArena(grid.getGrid());
        updateIterationCounter(grid.getIterations());
        grid.iterate();
        iterate();
      }, TIMEOUT);
    }

    iterate();
  }

  function pause() {
    inPlay = false;
    clearTimeout(iterationTimeout);
  }

  function updateIterationCounter(iterations) {
    const iterationCounter = document.getElementById('iterations');
    iterationCounter.innerHTML = iterations;
  }

  return {
    start,
    play,
    pause
  }
}

module.exports = Game;

class Dom {
  constructor(arenaSize) {
    this.document = global.document;
    this.arena = this.document.getElementById('arena');
    this.arena.style.width = arenaSize + 'px'; // abstract html
    this.arena.style.height = arenaSize + 'px'; // abstract html
  }

  reset() {
    this.arena.innerHTML = null;
  }

  draw(grid, rows, columns, blockSize) {
    for(let rowsIterator = 0; rowsIterator < rows; rowsIterator ++) {
      for(let columnsIterator = 0; columnsIterator < columns; columnsIterator++) {
        let el = this.document.createElement('div'); // abstract html
        el.style.width = blockSize + 'px'; // abstract html
        el.style.height = blockSize + 'px'; // abstract html
        el.classList.add('cell'); // abstract html
        grid[rowsIterator][columnsIterator] ? el.classList.add('alive') : null;
        this.arena.appendChild(el);
      }
    }
  }

  update(grid, rows, columns) {
    let position = 0;
    let cells = this.arena.getElementsByClassName('cell');
    for(let rowsIterator = 0; rowsIterator < rows; rowsIterator ++) {
      for(let columnsIterator = 0; columnsIterator < columns; columnsIterator++) {
        grid[rowsIterator][columnsIterator] ? cells[position].classList.add('alive') :
          cells[position].classList.remove('alive');
          position++;
      }
    }
  }
}

export default Dom;

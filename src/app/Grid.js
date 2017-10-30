// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

class Grid {
  constructor(rows, columns, randomGenerator) {
    this._rows = rows;
    this._columns = columns;
    this._grids = [];
    this._iterations;
    this.randomGenerator = randomGenerator || Math.random;
  }

  isElementOutsideGrid(elementRow, elementColumn) {
    return elementRow < 0 || elementRow > this._rows - 1 || elementColumn < 0 || elementColumn > this._columns - 1;
  }

  getElement(elementRow, elementColumn) {
    return this.isElementOutsideGrid(elementRow, elementColumn) ? null : this.getGrid()[elementRow][elementColumn];
  }

  getAliveNeighbours(neighbours) {
    return neighbours.filter(function(element) { return element; }).length;
  }

  applyRules(elementRow, elementColumn, aliveNeighbours) {
    let alive = this.getElement(elementRow, elementColumn);
    if( (aliveNeighbours < 2 || aliveNeighbours > 3) && alive) {
      return !alive;
    }

    if(aliveNeighbours === 3 && !alive) {
      return !alive;
    }
    return alive;
  }

  init() {
    let grid = [];
    this._iterations = 0;
    for(let rowsIterator = 0; rowsIterator < this._rows; rowsIterator++) {
      let row = [];
      for(let columnsIterator = 0; columnsIterator < this._columns; columnsIterator++) {
        row[columnsIterator] = this.randomGenerator() < 0.5 ? true : false;
      }
      grid.push(row);
    }
    this._grids.push(grid);
  }

   getGrid() {
    return this._grids[this._grids.length - 1];
  }

   setGrid(grid) {
    this._grids.push(grid);
  }

   getElementNeighbours(elementRow, elementColumn) {
    let neighbours = [];
    for(let rowsIterator = elementRow - 1; rowsIterator < elementRow + 2; rowsIterator++) {
      for(let columnsIterator = elementColumn - 1; columnsIterator < elementColumn + 2; columnsIterator++) {
        if(!(rowsIterator == elementRow && columnsIterator == elementColumn)) {
          this.isElementOutsideGrid(rowsIterator, columnsIterator) ? null : neighbours.push(this.getElement(rowsIterator, columnsIterator));
        }
      }
    }
    return neighbours;
  }

  iterate() {
   this._iterations++;
    let nextGrid = [];
    for(let rowsIterator = 0; rowsIterator < this._rows; rowsIterator++) {
      let row = [];
      for(let columnsIterator = 0; columnsIterator < this._columns; columnsIterator++) {
        let neighbours = this.getElementNeighbours(rowsIterator, columnsIterator);
        let aliveNeighbours = this.getAliveNeighbours(neighbours);
        row[columnsIterator] = this.applyRules.call(this, rowsIterator, columnsIterator, aliveNeighbours);
      }
      nextGrid.push(row);
    }
    this.setGrid(nextGrid);
  }

  getIterations() {
    return this._iterations;
  }

  getRowNumber() {
    return this._rows;
  }

  getColumnNumber() {
    return this._columns;
  }
}

export default Grid;

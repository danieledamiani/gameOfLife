// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function Grid(rows, columns) {
  let _rows = rows;
  let _columns = columns;
  let _grids = [];
  let _iterations;

  function _isElementOutsideGrid(elementRow, elementColumn) {
    return elementRow < 0 || elementRow > _rows - 1 || elementColumn < 0 || elementColumn > _columns - 1;
  }

  function _getElement(elementRow, elementColumn) {
    return _isElementOutsideGrid(elementRow, elementColumn) ? null : _getGrid()[elementRow][elementColumn];
  }

  function _getAliveNeighbours(neighbours) {
    return neighbours.filter(function(element) { return element; }).length;
  }

  function _applyRules(elementRow, elementColumn, aliveNeighbours) {
    let alive = _getElement(elementRow, elementColumn);
    if( (aliveNeighbours < 2 || aliveNeighbours > 3) && alive) {
      return !alive;
    }

    if(aliveNeighbours === 3 && !alive) {
      return !alive;
    }
    return alive;
  }

  function _init() {
    let grid = [];
    _iterations = 0;
    for(let rowsIterator = 0; rowsIterator < _rows; rowsIterator++) {
      let row = [];
      for(let columnsIterator = 0; columnsIterator < _columns; columnsIterator++) {
        row[columnsIterator] = Math.random() < 0.5 ? true : false;
      }
      grid.push(row);
    }
    _grids.push(grid);
  }

  function _getGrid() {
    return _grids[_grids.length - 1];
  }

  function _setGrid(grid) {
    _grids.push(grid);
  }

  function _getElementNeighbours(elementRow, elementColumn) {
    let neighbours = [];
    for(let rowsIterator = elementRow - 1; rowsIterator < elementRow + 2; rowsIterator++) {
      for(let columnsIterator = elementColumn - 1; columnsIterator < elementColumn + 2; columnsIterator++) {
        if(!(rowsIterator == elementRow && columnsIterator == elementColumn)) {
          _isElementOutsideGrid(rowsIterator, columnsIterator) ? null : neighbours.push(_getElement(rowsIterator, columnsIterator));
        }
      }
    }
    return neighbours;
  }

  function _iterate() {
    _iterations++;
    let nextGrid = [];
    for(let rowsIterator = 0; rowsIterator < _rows; rowsIterator++) {
      let row = [];
      for(let columnsIterator = 0; columnsIterator < _columns; columnsIterator++) {
        let neighbours = _getElementNeighbours(rowsIterator, columnsIterator);
        let aliveNeighbours = _getAliveNeighbours(neighbours);
        row[columnsIterator] = _applyRules.call(this, rowsIterator, columnsIterator, aliveNeighbours);
      }
      nextGrid.push(row);
    }
    _setGrid(nextGrid);
  }

  function _getIterations() {
    return _iterations;
  }

  return {
    init: _init,
    getGrid: _getGrid,
    iterate: _iterate,
    getIterations: _getIterations
  }
}

module.exports = Grid;

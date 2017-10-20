import Grid from './Grid';
import { expect } from 'chai';

describe('Grid', () => {
  it('should return true if the test env is correctly set', () => {
    expect(true).to.equal(true);
  });
});

describe('Grid', function() {
  it('should be defined', function() {
    const grid = new Grid(1, 4);

    expect(grid).not.to.be.undefined;
    expect(grid.init).not.to.be.undefined;
    expect(grid.getGrid).not.to.be.undefined;
    expect(grid.iterate).not.to.be.undefined;
    expect(grid.getIterations).not.to.be.undefined;
  });

  it('should return a 2 dimensional array defined by parameters specified in constructor', function() {
    const ROWS = 4;
    const COLUMNS = 4;
    const grid = new Grid(ROWS, COLUMNS);
    grid.init();

    const result = grid.getGrid();
    expect(result.length).to.equal(ROWS);
    expect(result[0].length).to.equal(COLUMNS);
  });

  it('should increment the counter after an iteration', function() {
    const ROWS = 4;
    const COLUMNS = 4;
    const grid = new Grid(ROWS, COLUMNS);
    grid.init();

    let iterations = grid.getIterations();
    expect(iterations).to.equal(0);

    grid.iterate();
    iterations = grid.getIterations();

    expect(iterations).to.equal(1);
  });

  it('should return a 1x1 grid that contains a dead cell after the first iteration', function() {
    const grid = new Grid(1, 1);
    grid.init();

    grid.iterate();
    const iteration2 = grid.getGrid();
    expect(iteration2[0][0]).to.be.false;
  });

  it('should return a 2x1 grid that contains only dead cells after the first iteration', function() {
    const grid = new Grid(2, 1);
    grid.init();

    grid.iterate();
    const iteration2 = grid.getGrid();
    expect(iteration2[0][0]).to.be.false;
  });
});

import Game from './Game';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Game', () => {
  it('should return true if the test env is correctly set', () => {
    expect(true).to.equal(true);
  });
});

describe('Game', function() {
  let Dom, Grid;

  describe('constructor', () => {
    beforeEach(() => {
      Dom = sinon.stub().returns({
        reset: sinon.spy(),
        draw: sinon.spy(),
        update: sinon.spy(),
        updateIterations: sinon.spy()
      });
      Grid = sinon.stub().returns({
        init: sinon.spy(),
        getRowNumber: sinon.spy(() => 2),
        getColumnNumber: sinon.spy(() => 2),
        getGrid: sinon.spy(() => [[true, true], [false, false]]),
        getIterations: sinon.spy(() => 1),
        iterate: sinon.spy()
      });
    });

    it('should throw an error if the grid parameter is not defined', function() {
      let game;
      try {
        game = new Game();
      } catch(err) {
        expect(game).to.be.undefined;
        expect(err.message).to.eql('grid or arena is not defined');
      }
    });

    it('should be defined', () => {
      const dom = new Dom(10);
      const grid = new Grid(2, 2);
      const gameOptions = {
        dom,
        grid,
        timeout: 500,
        arenaSize: 200
      };
      const game = new Game(gameOptions);

      expect(game).not.to.be.undefined;
      expect(typeof game.start).to.eql('function');
      expect(typeof game.play).to.eql('function');
      expect(typeof game.updateIterationCounter).to.eql('function');
    });
  });

  describe('start()', () => {
    it('should initialize an arena and start the game', (done) => {
      const dom = new Dom(10);
      const grid = new Grid(2, 2);
      const gameOptions = {
        dom,
        grid,
        timeout: 500,
        arenaSize: 200
      };
      const game = new Game(gameOptions);
      game.start();
      setTimeout(() => {
        game.pause();
        done();
        expect(grid.init.calledOnce()).to.be.true;
        expect(dom.reset.calledOnce()).to.be.true;
        expect(dom.draw.calledOnce()).to.be.true;
        expect(grid.getGrid.calledTwice()).to.be.true;
        expect(dom.update.calledOnce()).to.be.true;
        expect(grid.iterate.calledOnce()).to.be.true;
      }, 450);
    });
  });

});

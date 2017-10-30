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

  beforeEach(() => {
    Dom = sinon.stub().returns({
      test: sinon.spy(() => 'this is a test '),
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

  describe('constructor', () => {
    it('should throw an error if neither the grid or the dom are not defined', function() {
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
      expect(typeof game.init).to.eql('function');
      expect(typeof game.play).to.eql('function');
      expect(typeof game.updateIterationCounter).to.eql('function');
    });
  });

  describe('init()', () => {
    it('should initialize a the game', () => {
      const dom = new Dom(10);
      const grid = new Grid(2, 2);
      const gameOptions = {
        dom,
        grid,
        timeout: 500,
        arenaSize: 200
      };
      const game = new Game(gameOptions);
      game.init();

      expect(grid.init.calledOnce).to.be.true;
      expect(dom.reset.calledOnce).to.be.true;
      expect(dom.draw.calledOnce).to.be.true;
    });
  });

  describe('play()', () => {
    it('should set the game in the play status', (done) => {
      const dom = new Dom(10);
      const grid = new Grid(2, 2);
      const gameOptions = {
        dom,
        grid,
        timeout: 500,
        arenaSize: 200
      };
      const game = new Game(gameOptions);
      game.init();
      game.play();
      expect(game.inPlay).to.be.true;

      setTimeout(() => {
        game.pause();
        done();
        expect(grid.init.calledTwice).to.be.true;
        expect(dom.reset.calledOnce).to.be.true;
        expect(dom.draw.calledOnce).to.be.true;
        expect(grid.getGrid.calledTwice).to.be.true;
        expect(dom.update.calledOnce).to.be.true;
        expect(grid.iterate.calledOnce).to.be.true;
      }, 450);
    });
  });

  describe('pause()', () => {
    it('should set the game in the pause status', (done) => {
      const dom = new Dom(10);
      const grid = new Grid(2, 2);
      const gameOptions = {
        dom,
        grid,
        timeout: 500,
        arenaSize: 200
      };
      const game = new Game(gameOptions);
      game.init();
      game.play();

      setTimeout(() => {
        game.pause();
        expect(game.inPlay).to.be.false;
        done();
      }, 450);
    });
  });

  describe('updateIterationCounter()', () => {

    it('should set call the method updateIterations on the dom object', () => {
      const dom = new Dom(10);
      const grid = new Grid(2, 2);
      const gameOptions = {
        dom,
        grid,
        timeout: 500,
        arenaSize: 200
      };
      const game = new Game(gameOptions);
      game.updateIterationCounter(3);

      expect(dom.updateIterations.calledWith(3)).to.be.true;
    });
  });

});

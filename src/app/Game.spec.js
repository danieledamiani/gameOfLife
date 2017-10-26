import Dom from './Dom';
import Game from './Game';
import Grid from './Grid';
import { expect } from 'chai';

describe('Game', () => {
  it('should return true if the test env is correctly set', () => {
    expect(true).to.equal(true);
  });
});

describe.skip('Game', function() {
  describe('constructor', () => {
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
    it('should initialize an arena and start the game', () => {
      const dom = new Dom(10);
      const grid = new Grid(2, 2);
      const gameOptions = {
        dom,
        grid,
        timeout: 500,
        arenaSize: 200
      };
      const game = new Game(gameOptions);
      game.play();

    });
  });

});

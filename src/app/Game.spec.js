import Game from './Game';
import { expect } from 'chai';

describe('Game', () => {
  it('should return true if the test env is correctly set', () => {
    expect(true).to.equal(true);
  });
});

describe('Game', function() {
  it('should throw an error if the grid parameter is not defined', function() {
    let game;
    try {
      game = new Game();
    } catch(err) {
      expect(game).to.be.undefined;
      expect(err.message).to.eql('grid is not defined');
    }
  });

});

import Game from './Game';
import { expect } from 'chai';

describe('Game', () => {
  it('should return true if the test env is correctly set', () => {
    expect(true).to.equal(true);
  });
});

describe('Game', function() {
  it('should be defined', function() {
    const game = new Game();

    expect(game).not.to.be.undefined;
  });

});

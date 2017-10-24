import './style.css';
import Grid from './app/Grid';
import Game from './app/Game';

const TIMEOUT = 700;
const ARENA_SIZE = 600;
const ROWS = 40;

window.addEventListener('load', function() {
  const grid = new Grid(ROWS, ROWS);
  const game = new Game({
    grid: grid,
    timeout: TIMEOUT,
    arenaSize: ARENA_SIZE
  });
  game.start();
  const playButton = document.getElementById('play');
  const pauseButton = document.getElementById('pause');
  // const nextButton = document.getElementById('next');
  // const prevButton = document.getElementById('prev');

  playButton.addEventListener('click', function() {
    game.play();
  });

  pauseButton.addEventListener('click', function() {
    game.pause();
  });
});

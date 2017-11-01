import './style.css';
import Dom from './app/Dom';
import Grid from './app/Grid';
import Game from './app/Game';

const TIMEOUT = 700;
const ARENA_SIZE = 600;
const ROWS = 40;

window.addEventListener('load', function() {
  const grid = new Grid(ROWS, ROWS);
  const dom = new Dom(ARENA_SIZE);
  const game = new Game({
    dom: dom,
    grid: grid,
    timeout: TIMEOUT,
    arenaSize: ARENA_SIZE
  });
  game.init();
  game.play();
  const playButton = document.getElementById('play');
  const pauseButton = document.getElementById('pause');
  const nextButton = document.getElementById('next');
  // const prevButton = document.getElementById('prev');

  playButton.addEventListener('click', function() {
    game.play();
  });

  pauseButton.addEventListener('click', function() {
    game.pause();
  });

  nextButton.addEventListener('click', function() {
    game.next();
  });
});

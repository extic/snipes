import tilesImage from './assets/images/tileset.png';
import { handleBullets } from './bullet';
import { rotateEggs } from './eggs';
import { moveHero, rotateHero } from './hero';
import { registerKeyHandlers } from './keyboard';
import { moveSnipes } from './snipes';
import { createWorld, drawWorld, World } from './world';

const gameSpeed = 30;
const eggCount = 1;
const screenWidth = 30;
const screenHeight = 30;

function gameLoop(world: World, ctx: CanvasRenderingContext2D, tiles: HTMLImageElement) {
  world.counter++;
  if (world.counter > 12) {
    world.counter = 0;
  }

  handleBullets(world);
  moveHero(1, 0, world);

  rotateHero(world);
  rotateEggs(world);

  if (world.counter === 0) {
    moveSnipes(world);
  }

  drawWorld(screenWidth, screenHeight, world, ctx, tiles);

  setTimeout(() => {
    gameLoop(world, ctx, tiles);
  }, gameSpeed);
}

function main() {
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('Browser does not support canvas');
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context could not be obtained');
  }
  // ctx.imageSmoothingEnabled = false;
  canvas.width = 900;
  canvas.height = 900;

  const tiles = new Image();
  tiles.onload = function () {
    const world = createWorld(eggCount, screenWidth, screenHeight);

    registerKeyHandlers();

    gameLoop(world, ctx, tiles);
  };
  tiles.src = tilesImage;
}

main();

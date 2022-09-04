import tilesImage from './assets/images/tileset.png';
import { handleBullets } from './bullet';
import { moveHero, rotateHero } from './hero';
import { registerKeyHandlers } from './keyboard';
import { activateResizeObserver } from './resize-observer';
import { moveSnipes } from './snipes';
import { createWorld, drawWorld, World } from './world';

const gameSpeed = 30;
const eggCount = 10;
let screenWidth = 10;
let screenHeight = 10;
let startDrawX = 0;
let startDrawY = 0;

export function setScreenWidthAndHeight(width: number, height: number, drawX: number, drawY: number) {
  screenWidth = width;
  screenHeight = height;
  startDrawX = drawX;
  startDrawY = drawY;
}

function gameLoop(world: World, ctx: CanvasRenderingContext2D, tiles: HTMLImageElement) {
  world.counter++;
  if (world.counter > 12) {
    world.counter = 0;
  }

  handleBullets(world);
  moveHero(1, 0, world);

  rotateHero(world);
  world.eggs.forEach((it) => it.rotate());

  if (world.counter === 0) {
    moveSnipes(world);
  }

  drawWorld(screenWidth, screenHeight, startDrawX, startDrawY,  world, ctx, tiles);

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

  activateResizeObserver(canvas);

  const tiles = new Image();
  tiles.onload = function () {
    const world = createWorld(eggCount, screenWidth, screenHeight);

    registerKeyHandlers();

    gameLoop(world, ctx, tiles);
  };
  tiles.src = tilesImage;
}

main();

import { createMaze, Maze } from './maze';
import { createSnipe, Snipe } from './snipes';
import { createEgg, Egg } from './eggs';
import { createHero, posX as heroPosX, posY as heroPosY } from './hero';
import { Bullet } from './bullet';
import { increaseEggScore, increaseSnipeScore } from './score';

export type World = {
  maze: Maze;
  eggs: Egg[];
  snipes: Snipe[];
  bullets: Bullet[];
  counter: number;
  screenWidth: number;
  screenHeight: number;
};

export function createWorld(eggCount: number, screenWidth: number, screenHeight: number): World {
  const maze = createMaze();

  createHero(maze, screenWidth, screenHeight);

  const eggs: Egg[] = [];
  while (eggs.length < eggCount) {
    eggs.push(createEgg(maze));
    increaseEggScore();
  }

  const snipes: Snipe[] = [];
  while (snipes.length < 200) {
    const posX = Math.floor(Math.random() * maze.length);
    const posY = Math.floor(Math.random() * maze.length);
    if (maze.cells[posY][posX] === 0 && maze.cells[posY][(posX + 1) % maze.length] === 0) {
      const snipe = createSnipe(posX, posY);
      snipes.push(snipe);
      maze.cells[snipe.posY][snipe.posX] = 16;
      increaseSnipeScore();
    }
  }

  return { maze, eggs, snipes, bullets: [], counter: 0, screenWidth, screenHeight };
}

export function drawWorld(screenWidth: number, screenHeight: number, startDrawX: number, startDrawY: number, world: World, ctx: CanvasRenderingContext2D, tiles: HTMLImageElement) {
  const halfWidth = Math.floor(world.screenWidth / 2)
  const halfHeight = Math.floor(world.screenHeight / 2);

  for (let j = 0; j < screenHeight; j++) {
    for (let i = 0; i < screenWidth; i++) {
      ctx.drawImage(
        tiles, 
        world.maze.cells[(j + heroPosY - halfHeight + world.maze.length) % world.maze.length][(i + heroPosX - halfWidth + world.maze.length) % world.maze.length] * 30, 
        0, 30, 30, startDrawX + i * 30, startDrawY + j * 30, 30, 30);
    }
  }
}

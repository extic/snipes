import { createMaze, Maze } from './maze';
import { createSnipe, Snipe } from './snipes';

export type World = {
  maze: Maze;
  snipes: Snipe[];
};

export function createWorld(): World {
  const maze = createMaze();

  const snipes: Snipe[] = [];
  while (snipes.length < 50) {
    const posX = Math.floor(Math.random() * maze.length);
    const posY = Math.floor(Math.random() * maze.length);
    if (maze.cells[posY][posX] === 0 && maze.cells[posY][(posX + 1) % maze.length] === 0) {
      const snipe = createSnipe(posX, posY);
      snipes.push(snipe);
      maze.cells[snipe.posY][snipe.posX] = 16;
    }
  }

  return { maze, snipes };
}

export function drawWorld(world: World, ctx: CanvasRenderingContext2D, tiles: HTMLImageElement) {
  for (let j = 0; j < world.maze.length; j++) {
    for (let i = 0; i < world.maze.length; i++) {
      ctx.drawImage(tiles, world.maze.cells[j][i] * 30, 0, 30, 30, i * 30, j * 30, 30, 30);
    }
  }
}

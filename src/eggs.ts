import { Maze } from './maze';
import { random } from './utils';
import { World } from './world';

export type Egg = {
  posX: number;
  posY: number;
  rotation: number;
};

export function createEgg(maze: Maze): Egg {
  while (true) {
    const posX = Math.floor(random(maze.length / maze.cellLength) * maze.cellLength + maze.cellLength / 2);
    const posY = Math.floor(random(maze.length / maze.cellLength) * maze.cellLength + maze.cellLength / 2);

    if (maze.cells[posY][posX] === 0) {
      maze.cells[posY][posX] = 25;
      return { posX, posY, rotation: 0 };
    }
  }
}

export function rotateEggs(world: World) {
  world.eggs.forEach((egg) => {
    egg.rotation++;
    if (egg.rotation > 4) {
      egg.rotation -= 5;
    }
    world.maze.cells[egg.posY][egg.posX] = 25 + egg.rotation;
  });
}

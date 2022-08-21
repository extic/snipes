import { Maze } from './maze';
import { World } from './world';

let rotation = 0;
let face = false;

export function createHero(maze: Maze) {
  maze.cells[Math.floor(maze.length / 2)][Math.floor(maze.length / 2)] = 30;
  maze.cells[Math.floor(maze.length / 2)][Math.floor(maze.length / 2 + 1)] = 31;
  maze.cells[Math.floor(maze.length / 2 + 1)][Math.floor(maze.length / 2)] = 34;
  maze.cells[Math.floor(maze.length / 2 + 1)][Math.floor(maze.length / 2) + 1] = 35;
}

export function rotateHero(world: World) {
  rotation++;
  if (rotation > 2) {
    rotation = 0;
  }

  if (rotation === 0) {
    face = !face;

    const maze = world.maze;
    maze.cells[Math.floor(maze.length / 2)][Math.floor(maze.length / 2)] = face ? 30 : 32;
    maze.cells[Math.floor(maze.length / 2)][Math.floor(maze.length / 2 + 1)] = face ? 31 : 33;
  }
}

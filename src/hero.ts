import { isKeyPressed } from './keyboard';
import { Maze } from './maze';
import { World } from './world';

let rotation = 0;
let face = false;
export let posX = 0;
export let posY = 0;

export function createHero(maze: Maze, screenWidth: number, screenHeight: number) {
  posX = (Math.floor(maze.cellLength / 2) - Math.floor(screenWidth / 2) + screenWidth) % screenWidth;
  posY = (Math.floor(maze.cellLength / 2) - Math.floor(screenHeight / 2) + screenHeight) % screenHeight;

  maze.cells[posY - 1][posX - 1] = 30;
  maze.cells[posY - 1][posX] = 31;
  maze.cells[posY][posX - 1] = 34;
  maze.cells[posY][posX] = 35;
}

function drawHero(world: World, erase: boolean) {
  const maze = world.maze;
  maze.cells[(posY - 1 + maze.length) % maze.length][(posX - 1 + maze.length) % maze.length] = erase ? 0 : face ? 30 : 32;
  maze.cells[(posY - 1 + maze.length) % maze.length][posX] = erase ? 0 : face ? 31 : 33;
  maze.cells[posY][(posX - 1 + maze.length) % maze.length] = erase ? 0 : 34;
  maze.cells[posY][posX] = erase ? 0 : 35;
}

export function rotateHero(world: World) {
  rotation++;
  if (rotation === 3) {
    rotation = 0;
  }

  if (rotation === 0) {
    face = !face;

    drawHero(world, false);
  }
}

export function moveHero(modX: number, modY: number, world: World) {
  if (rotation === 0) {
    drawHero(world, true);

    if (isKeyPressed('Numpad6')) {
      if (
        world.maze.cells[posY % world.maze.length][(posX + 1) % world.maze.length] === 0 &&
        world.maze.cells[(posY - 1 + world.maze.length) % world.maze.length][(posX + 1) % world.maze.length] === 0
      ) {
        posX = (posX + 1) % world.maze.length;
      }
    }
    if (isKeyPressed('Numpad4')) {
      if (
        world.maze.cells[posY % world.maze.length][(posX - 2 + world.maze.length) % world.maze.length] === 0 &&
        world.maze.cells[(posY - 1 + world.maze.length) % world.maze.length][(posX - 2 + world.maze.length) % world.maze.length] === 0
      ) {
        posX = (posX - 1 + world.maze.length) % world.maze.length;
      }
    }
    if (isKeyPressed('Numpad8')) {
      if (
        world.maze.cells[(posY - 2 + world.maze.length) % world.maze.length][posX] === 0 &&
        world.maze.cells[(posY - 2 + world.maze.length) % world.maze.length][(posX - 1 + world.maze.length) % world.maze.length] === 0
      ) {
        posY = (posY - 1 + world.maze.length) % world.maze.length;
      }
    }
    if (isKeyPressed('Numpad2')) {
      if (
        world.maze.cells[(posY + 1) % world.maze.length][posX] === 0 &&
        world.maze.cells[(posY + 1) % world.maze.length][(posX - 1 + world.maze.length) % world.maze.length] === 0
      ) {
        posY = (posY + 1) % world.maze.length;
      }
    }
    drawHero(world, false);
  }
}

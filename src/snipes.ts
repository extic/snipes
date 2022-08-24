import { pos, random } from './utils';
import { World } from './world';

export type Snipe = {
  posX: number;
  posY: number;
  arrowPosX: number;
  arrowPosY: number;
  dirX: number;
  dirY: number;
  steps: number;
};

export function createSnipe(posX: number, posY: number): Snipe {
    return { posX, posY, arrowPosX: 0, arrowPosY: 0, dirX: 0, dirY: 0, steps: 0 };
}

function setDirectionIfPossible(
  world: World,
  snipe: Snipe,
  dirX: number,
  dirY: number,
  tileNumber: number
) {
  const newPosX = pos(snipe.posX, dirX, world);
  const newPosY = pos(snipe.posY, dirY, world);

  if (world.maze.cells[newPosY][newPosX] === 0) {
    snipe.dirX = dirX;
    snipe.dirY = dirY;
    world.maze.cells[newPosY][newPosX] = tileNumber;
    snipe.arrowPosX = newPosX;
    snipe.arrowPosY = newPosY;
    snipe.steps = random(12) + 2;
  }
}

function chooseNewDirection(world: World, snipe: Snipe) {
  if (snipe.dirX !== 0 || snipe.dirY !== 0) {
    world.maze.cells[pos(snipe.posY, snipe.dirY, world)][pos(snipe.posX, snipe.dirX, world)] = 0;
  }

  snipe.dirX = 0;
  snipe.dirY = 0;

  const randomDir = random(8);
  switch (randomDir) {
    case 0:
      setDirectionIfPossible(world, snipe, 0, -1, 23);
      break;

    case 1:
      setDirectionIfPossible(world, snipe, 1, -1, 24);
      break;

    case 2:
      setDirectionIfPossible(world, snipe, 1, 0, 17);
      break;

    case 3:
      setDirectionIfPossible(world, snipe, 1, 1, 18);
      break;

    case 4:
      setDirectionIfPossible(world, snipe, 0, 1, 19);
      break;

    case 5:
      setDirectionIfPossible(world, snipe, -1, 1, 20);
      break;

    case 6:
      setDirectionIfPossible(world, snipe, -1, 0, 21);
      break;

    case 7:
      setDirectionIfPossible(world, snipe, -1, -1, 22);
      break;
  }
}

function moveSnipe(world: World, snipe: Snipe) {
  const newPosX = snipe.arrowPosX;//pos(snipe.posX, snipe.dirX, world);
  const newPosY = snipe.arrowPosY;//pos(snipe.posY, snipe.dirY, world);
  const newArrowPosX = pos(snipe.posX, snipe.dirX * 2, world);
  const newArrowPosY = pos(snipe.posY, snipe.dirY * 2, world);

  if (world.maze.cells[newArrowPosY][newArrowPosX] === 0) { 
    world.maze.cells[newArrowPosY][newArrowPosX] = world.maze.cells[newPosY][newPosX]
    snipe.arrowPosX = newArrowPosX;
    snipe.arrowPosY = newArrowPosY;    
    snipe.steps--;
  } else {
    snipe.steps = 0;
    snipe.dirX = 0;
    snipe.dirY = 0;
  }

  world.maze.cells[newPosY][newPosX] = 16
  world.maze.cells[snipe.posY][snipe.posX] = 0;
  snipe.posX = newPosX;
  snipe.posY = newPosY;
}

export function moveSnipes(world: World) {
  world.snipes.forEach((snipe) => {
    if (snipe.steps === 0) {
      chooseNewDirection(world, snipe);
    } else {
      moveSnipe(world, snipe);
    }
  });
}

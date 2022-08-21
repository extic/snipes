import { Direction } from './maze';
import { pos, random } from './utils';
import { World } from './world';

export type Snipe = {
  posX: number;
  posY: number;
  direction: Direction;
  steps: number;
};

export function createSnipe(posX: number, posY: number): Snipe {
    return { posX, posY, direction: Direction.None, steps: 0 };
}

function setDirectionIfPossible(
  world: World,
  snipe: Snipe,
  modX: number,
  modY: number,
  dir: Direction,
  tileNumber: number
) {
  const newPosX = modX ? pos(snipe.posX, modX, world) : snipe.posX;
  const newPosY = modY ? pos(snipe.posY, modY, world) : snipe.posY;

  if (world.maze.cells[newPosY][newPosX] === 0) {
    snipe.direction = dir;
    world.maze.cells[newPosY][newPosX] = tileNumber;
    snipe.steps = random(15);
  }
}

function chooseNewDirection(world: World, snipe: Snipe) {
  switch (snipe.direction) {
    case Direction.Top:
      world.maze.cells[pos(snipe.posY, -1, world)][snipe.posX] = 0;
      break;
    case Direction.TopRight:
      world.maze.cells[pos(snipe.posY, -1, world)][pos(snipe.posX, 1, world)] = 0;
      break;
    case Direction.Right:
      world.maze.cells[snipe.posY][pos(snipe.posX, 1, world)] = 0;
      break;
    case Direction.BottomRight:
      world.maze.cells[pos(snipe.posY, 1, world)][pos(snipe.posX, 1, world)] = 0;
      break;
    case Direction.Bottom:
      world.maze.cells[pos(snipe.posY, 1, world)][snipe.posX] = 0;
      break;
    case Direction.BottomLeft:
      world.maze.cells[pos(snipe.posY, 1, world)][pos(snipe.posX, -1, world)] = 0;
      break;
    case Direction.Left:
      world.maze.cells[snipe.posY][pos(snipe.posX, -1, world)] = 0;
      break;
    case Direction.TopLeft:
      world.maze.cells[pos(snipe.posY, -1, world)][pos(snipe.posX, -1, world)] = 0;
      break;
  }

  snipe.direction = Direction.None;

  const randomDir = random(8);
  switch (randomDir) {
    case 0:
      setDirectionIfPossible(world, snipe, 0, -1, Direction.Top, 23);
      break;

    case 1:
      setDirectionIfPossible(world, snipe, 1, -1, Direction.TopRight, 24);
      break;

    case 2:
      setDirectionIfPossible(world, snipe, 1, 0, Direction.Right, 17);
      break;

    case 3:
      setDirectionIfPossible(world, snipe, 1, 1, Direction.BottomRight, 18);
      break;

    case 4:
      setDirectionIfPossible(world, snipe, 0, 1, Direction.Bottom, 19);
      break;

    case 5:
      setDirectionIfPossible(world, snipe, -1, 1, Direction.BottomLeft, 20);
      break;

    case 6:
      setDirectionIfPossible(world, snipe, -1, 0, Direction.Left, 21);
      break;

    case 7:
      setDirectionIfPossible(world, snipe, -1, -1, Direction.TopLeft, 22);
      break;
  }
}

function moveSnipeIfPossible(world: World, snipe: Snipe, modX: number, modY: number) {
  const newPosX = modX ? pos(snipe.posX, modX, world) : snipe.posX;
  const newPosY = modY ? pos(snipe.posY, modY, world) : snipe.posY;
  const newPosX2 = modX ? pos(snipe.posX, modX * 2, world) : snipe.posX;
  const newPosY2 = modY ? pos(snipe.posY, modY * 2, world) : snipe.posY;

  if (world.maze.cells[newPosY2][newPosX2] === 0) { 
    world.maze.cells[newPosY2][newPosX2] = world.maze.cells[newPosY][newPosX]
    snipe.steps--;
  } else {
    snipe.steps = 0;
    snipe.direction = Direction.None;
  }

  world.maze.cells[newPosY][newPosX] = world.maze.cells[snipe.posY][snipe.posX]
  world.maze.cells[snipe.posY][snipe.posX] = 0;
  snipe.posX = newPosX;
  snipe.posY = newPosY;
}

function moveSnipe(world: World, snipe: Snipe) {
  switch (snipe.direction) {
    case Direction.Top:
      moveSnipeIfPossible(world, snipe, 0, -1);
      break;
    case Direction.TopRight:
      moveSnipeIfPossible(world, snipe, 1, -1);
      break;
    case Direction.Right:
      moveSnipeIfPossible(world, snipe, 1, 0);
      break;
    case Direction.BottomRight:
      moveSnipeIfPossible(world, snipe, 1, 1);
      break;
    case Direction.Bottom:
      moveSnipeIfPossible(world, snipe, 0, 1);
      break;
    case Direction.BottomLeft:
      moveSnipeIfPossible(world, snipe, -1, 1);
      break;
    case Direction.Left:
      moveSnipeIfPossible(world, snipe, -1, 0);
      break;
    case Direction.TopLeft:
      moveSnipeIfPossible(world, snipe, -1, -1);
      break;
  }  
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

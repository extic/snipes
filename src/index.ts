import tilesImage from './assets/images/tileset.png';
import { createMaze } from './maze';

type Snipe = {
  posX: number;
  posY: number;
  lastDirX: number;
  lastDirY: number;
  steps: number;
};

const snipes: Snipe[] = [];
for (let i = 0; i < 10; i++) {
  snipes.push({ posX: Math.floor(Math.random() * 40), posY: Math.floor(Math.random() * 20), lastDirX: 0, lastDirY: 0, steps: 0 });
}

function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, tiles: HTMLImageElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snipes.forEach((snipe) => {
    ctx.drawImage(tiles, 60, 0, 30, 30, snipe.posX * 30, snipe.posY * 30, 30, 30);
  });
}

function gameLoop(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, tiles: HTMLImageElement) {
  snipes.forEach((snipe) => {
    if (!snipe.steps) {
      snipe.lastDirX = Math.floor(Math.random() * 3 - 1);
      snipe.lastDirY = Math.floor(Math.random() * 3 - 1);
      snipe.steps = Math.floor(Math.random() * 5 + 1);
    }
    snipe.posX += snipe.lastDirX;
    snipe.posY += snipe.lastDirY;
    snipe.steps--;
  });

  draw(ctx, canvas, tiles);

  setTimeout(() => {
    gameLoop(ctx, canvas, tiles);
  }, 300);
}

function main1() {
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('Browser does not support canvas');
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context could not be obtained');
  }

  const tiles = new Image();
  tiles.onload = function () {
    // ctx.drawImage(img, 0, 0);
    gameLoop(ctx, canvas, tiles);
  };
  tiles.src = tilesImage;
}





class Cell {
  constructor(public x: number, public y: number, public topWall: boolean, public bottomWall: boolean, public leftWall: boolean, public rightWall: boolean, public status: string) {}
}

const gridLength = 60;
const cellLength = 7;
const grid: Cell[][] = [...Array(gridLength)].map((_, y) => [...Array(gridLength)].map((_, x) => new Cell(x, y, true, true, true, true, 'unvisited')));
const cellList: Cell[] = [];

function paintGrid(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let j=0; j<gridLength; j++) {
    for (let i=0; i<gridLength; i++) {
      const cell = grid[j][i];
      const posX = i * cellLength;
      const posY = j * cellLength;
      if (cell.status === 'visited') {
        ctx.fillStyle = 'red';
      } else if (cell.status === 'unvisited') {
        ctx.fillStyle = 'blue';
      } else {
        ctx.fillStyle = 'white';
      }
      ctx.fillRect(posX, posY, cellLength, cellLength);

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      if (cell.topWall) {

        ctx.moveTo(posX + 0, posY + 0.5);
        ctx.lineTo(posX + cellLength, posY + 0.5);
      }

      if (cell.leftWall) {
        ctx.moveTo(posX + 0.5, posY);
        ctx.lineTo(posX + 0.5, posY + cellLength);
      }

      if (cell.rightWall) {
        ctx.moveTo(posX + cellLength - 1 + 0.5, posY);
        ctx.lineTo(posX + cellLength - 1 + 0.5, posY + cellLength);
      }

      if (cell.bottomWall) {
        ctx.moveTo(posX, posY + cellLength - 1 + 0.5);
        ctx.lineTo(posX + cellLength, posY + cellLength - 1 + 0.5);
      }
      ctx.stroke();
    }
  }
}

function step(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): boolean {
  if (cellList.length === 0) {
    return true;
  }

  const currCell = cellList[cellList.length - 1];
  const unvisitedNeighbours: Cell[] = [];
  let neighbourCell = grid[(currCell.y - 1 + gridLength) % gridLength][currCell.x];
  if (neighbourCell.status === 'unvisited') {
    unvisitedNeighbours.push(neighbourCell);
  }
  neighbourCell = grid[(currCell.y + 1) % gridLength][currCell.x];
  if (neighbourCell.status === 'unvisited') {
    unvisitedNeighbours.push(neighbourCell);
  }
  neighbourCell = grid[currCell.y][(currCell.x - 1 + gridLength) % gridLength];
  if (neighbourCell.status === 'unvisited') {
    unvisitedNeighbours.push(neighbourCell);
  }
  neighbourCell = grid[currCell.y][(currCell.x + 1) % gridLength];
  if (neighbourCell.status === 'unvisited') {
    unvisitedNeighbours.push(neighbourCell);
  }
  if (unvisitedNeighbours.length === 0) {
    currCell.status = 'done';
    cellList.pop();
  } else {
    const chosenCell = unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)]
    chosenCell.status = 'visited';

    if (currCell.y == (chosenCell.y + 1) % gridLength) {
      currCell.topWall = false;
      chosenCell.bottomWall = false;
    } else if (currCell.y == (chosenCell.y - 1 + gridLength) % gridLength) {
      currCell.bottomWall = false;
      chosenCell.topWall = false;
    } else if (currCell.x == (chosenCell.x + 1) % gridLength) {
      currCell.leftWall = false;
      chosenCell.rightWall = false;
    } else if (currCell.x == (chosenCell.x - 1 + gridLength) % gridLength) {
      currCell.rightWall = false;
      chosenCell.leftWall = false;
    }
    cellList.push(chosenCell);
  }

  // step(ctx, canvas);

  return false;

  // paintGrid(ctx, canvas);
  // setTimeout(() => {
  //   step(ctx, canvas);
  // }, 10);
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
  canvas.width = 800;
  canvas.height = 800;

  const tiles = new Image();
  tiles.onload = function () {
    const maze = createMaze();
    for (let j=0; j<maze.length; j++) {
      for (let i=0; i<maze.length; i++) {
        ctx.drawImage(tiles, maze.cells[j][i] * 30, 0, 30, 30, i * 30, j * 30, 30, 30);
      }
    }  
  };
  tiles.src = tilesImage;


  // const firstCell = grid[Math.floor(Math.random() * gridLength)][Math.floor(Math.random() * gridLength)]
  // firstCell.status = 'visited';
  // cellList.push(firstCell);
  // // ctx.translate(0.5, 0.5)
  // while (!step(ctx, canvas));
  
  // paintGrid(ctx, canvas);

}

main();

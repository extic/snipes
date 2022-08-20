const gridLength = 3;
const cellLength = 7;

class GridElement {
  constructor(
    public x: number,
    public y: number,
    public topWall: boolean,
    public bottomWall: boolean,
    public leftWall: boolean,
    public rightWall: boolean,
    public status: string
  ) {}
}

enum Direction { Top, TopRight, Right, BottomRight, Bottom, BottomLeft, Left, TopLeft }

function getNeighbour(i: number, j: number, dir: Direction, grid: GridElement[][]): GridElement {
  switch (dir) {
    case Direction.Top: 
      return grid[(j - 1 + gridLength) % gridLength][i];
    case Direction.TopRight: 
      return grid[(j - 1 + gridLength) % gridLength][(i + 1) % gridLength];
    case Direction.Right: 
      return grid[j][(i + 1) % gridLength];
    case Direction.BottomRight: 
      return grid[(j + 1) % gridLength][(i + 1) % gridLength];
    case Direction.Bottom: 
      return grid[(j + 1) % gridLength][i];
    case Direction.BottomLeft: 
      return grid[(j + 1) % gridLength][(i - 1 + gridLength) % gridLength];
    case Direction.Left:
      return grid[j][(i - 1 + gridLength) % gridLength];
    case Direction.TopLeft: 
      return grid[(j - 1 + gridLength) % gridLength][(i - 1 + gridLength) % gridLength];
  }
}

function addNeightbourIfNotVisited(currCell: GridElement, grid: GridElement[][], direction: Direction, unvisitedNeighbours: GridElement[]) {
  const neighbourCell = getNeighbour(currCell.x, currCell.y, direction, grid);
  if (neighbourCell.status === 'unvisited') {
    unvisitedNeighbours.push(neighbourCell);
  }
}

function step(grid: GridElement[][], cellList: GridElement[]): boolean {
  if (cellList.length === 0) {
    return true;
  }

  const currCell = cellList[cellList.length - 1];

  const unvisitedNeighbours: GridElement[] = [];
  addNeightbourIfNotVisited(currCell, grid, Direction.Top, unvisitedNeighbours);
  addNeightbourIfNotVisited(currCell, grid, Direction.Bottom, unvisitedNeighbours);
  addNeightbourIfNotVisited(currCell, grid, Direction.Left, unvisitedNeighbours);
  addNeightbourIfNotVisited(currCell, grid, Direction.Right, unvisitedNeighbours);

  if (unvisitedNeighbours.length === 0) {
    currCell.status = 'done';
    cellList.pop();
  } else {
    const chosenCell = unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)];
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

  return false;
}

type MazeData = {
  grid: GridElement[][],
  cellList: GridElement[],
}

function createMazeData(): MazeData {
  const grid = [...Array(gridLength)].map((_, y) => [...Array(gridLength)].map((_, x) => new GridElement(x, y, true, true, true, true, 'unvisited')));

  const cellList: GridElement[] = [];
  const firstCell = grid[Math.floor(Math.random() * gridLength)][Math.floor(Math.random() * gridLength)];
  firstCell.status = 'visited';
  cellList.push(firstCell);

  return { grid, cellList };
}

export type Maze = {
  length: number;
  cells: number[][];
};

export function createMaze(): Maze {
  const { grid, cellList } = createMazeData();
  while (!step(grid, cellList));

  const length = gridLength * cellLength;
  const cells = [...Array(length)].map(() => [...Array(length)].map(() => 0));
  for (let j=0; j<gridLength; j++) {
    for (let i=0; i<gridLength; i++) {
      const element = grid[j][i];
      const posX = i * cellLength;
      const posY = j * cellLength;
      const topNeighbour = getNeighbour(i, j, Direction.Top, grid);
      const leftNeighbour = getNeighbour(i, j, Direction.Left, grid);

      if (element.topWall) {
        for (let x=1; x<cellLength; x++) {
          cells[posY][posX + x] = 2;
        }
      }
      if (element.leftWall) {
        for (let y=1; y<cellLength; y++) {
          cells[posY + y][posX] = 1;
        }
      }

      if (element.topWall) {
        if (element.leftWall) {
          if (topNeighbour.leftWall) {
            if (leftNeighbour.topWall) {
              cells[posY][posX] = 15;
            } else {
              cells[posY][posX] = 14;
            }
          } else {
            if (leftNeighbour.topWall) {
              cells[posY][posX] = 11;
            } else {
              cells[posY][posX] = 9;
            }
          }
        } else {
          if (topNeighbour.leftWall) {
            if (leftNeighbour.topWall) {
              cells[posY][posX] = 13;
            } else {
              cells[posY][posX] = 8;
            }
          } else {
            if (leftNeighbour.topWall) {
              cells[posY][posX] = 2;
            } else {
              cells[posY][posX] = 4;
            }
          }          
        }
      } else {
        if (element.leftWall) {
          if (topNeighbour.leftWall) {
            if (leftNeighbour.topWall) {
              cells[posY][posX] = 12;
            } else {
              cells[posY][posX] = 1;
            }
          } else {
            if (leftNeighbour.topWall) {
              cells[posY][posX] = 10;
            } else {
              cells[posY][posX] = 5;
            }
          }
        } else {
          if (topNeighbour.leftWall) {
            if (leftNeighbour.topWall) {
              cells[posY][posX] = 7;
            } else {
              cells[posY][posX] = 6;
            }
          } else {
            if (leftNeighbour.topWall) {
              cells[posY][posX] = 3;
            } else {
              // cells[posY][posX] = 0; ?????
            }
          }          
        }
      }
    }
  }

  return {
    length: gridLength * cellLength,
    cells,
  };
}

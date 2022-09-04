import { Maze } from './maze';
import { random } from './utils';

export class Egg {
  private posX: number;
  private posY: number
  private rotation: number;

  constructor(private readonly maze: Maze) {
    this.rotation = 0;
    
    while (true) {
      this.posX = Math.floor(random(maze.length / maze.cellLength) * maze.cellLength + maze.cellLength / 2);
      this.posY = Math.floor(random(maze.length / maze.cellLength) * maze.cellLength + maze.cellLength / 2);
  
      if (maze.cells[this.posY][this.posX] === 0) {
        maze.cells[this.posY][this.posX] = 25;
        break;
      }
    }
  }

  public rotate() {
    this.rotation = this.rotation == 4  ? 0 : this.rotation + 1;
    this.maze.cells[this.posY][this.posX] = 25 + this.rotation ;    
  } 
}

import { isOnSpeed, posX as heroPosX, posY as heroPosY } from './hero';
import { isKeyPressed } from './keyboard';
import { World } from './world';

let rotation = 0;
let bulletPhase = false;

export type Bullet = {
  posX: number;
  posY: number;
  dirX: number;
  dirY: number;
  life: number;
};

function createBullets(world: World) {
  if (rotation === 0 && !isOnSpeed) {
    let dirX = 0;
    let dirY = 0;

    if (isKeyPressed('KeyD')) {
      dirX++;
    }
    if (isKeyPressed('KeyA')) {
      dirX--;
    }
    if (isKeyPressed('KeyS')) {
      dirY++;
    }
    if (isKeyPressed('KeyW')) {
      dirY--;
    }

    if (dirX !== 0 || dirY !== 0) {
      let posX = 0;
      let posY = 0;

      if (dirX === -1) {
        posX = heroPosX - 2;
      } else if (dirX === 0) {
        posX = heroPosX;
      } else if (dirX === 1) {
        posX = heroPosX + 1;
      }

      if (dirY === -1) {
        posY = heroPosY - 2;
      } else if (dirY === 0) {
        posY = heroPosY - 1;
      } else if (dirY === 1) {
        posY = heroPosY + 1;
      }

      posX = (posX + world.maze.length) % world.maze.length;
      posY = (posY + world.maze.length) % world.maze.length;

      if (world.maze.cells[posY][posX] === 0) {
        const bullet = { posX, posY, dirX, dirY, life: 20 };  
        world.maze.cells[bullet.posY][bullet.posX] = 36;
        world.bullets.push(bullet);
      }
    }
  }
}

function moveBullets(world: World) {
  bulletPhase = !bulletPhase;

  let i = 0;
  while (i < world.bullets.length) {
    const bullet = world.bullets[i];

    world.maze.cells[bullet.posY][bullet.posX] = 0;

    bullet.life--;
    if (bullet.life === 0) {
      world.bullets.splice(i, 1);
    } else {
      bullet.posX = (bullet.posX + bullet.dirX + world.maze.length) % world.maze.length;
      bullet.posY = (bullet.posY + bullet.dirY + world.maze.length) % world.maze.length;

      const target = world.maze.cells[bullet.posY][bullet.posX]
      if (target === 0) {
        if (bulletPhase) {
          world.maze.cells[bullet.posY][bullet.posX] = 37;
        } else {
          world.maze.cells[bullet.posY][bullet.posX] = 36;
        }

        i++;
      } else {
        if (target >= 16 && target <= 24) {
          const index = world.snipes.findIndex((snipe) => 
            (bullet.posX === snipe.posX && bullet.posY === snipe.posY) ||
            (bullet.posX === snipe.arrowPosX && bullet.posY === snipe.arrowPosY && (snipe.dirX !== 0 || snipe.dirY !== 0)));
          if (index !== -1) {
            const snipe = world.snipes.splice(index, 1)[0];
            world.maze.cells[snipe.posY][snipe.posX] = 0;
            if (snipe.dirX !== 0 || snipe.dirY !== 0) {
              world.maze.cells[snipe.arrowPosY][snipe.arrowPosX] = 0;
            }
          }
        } else if (target >= 25 && target <= 29) {
          const index = world.eggs.findIndex((egg) => bullet.posX === egg.posX && bullet.posY === egg.posY)
          if (index !== -1) {
            const egg = world.eggs.splice(index, 1)[0];
            world.maze.cells[egg.posY][egg.posX] = 0;
          }
        }
        world.bullets.splice(i, 1);
      }
    }
  }
}

export function handleBullets(world: World) {
  rotation++;
  if (rotation === 4) {
    rotation = 0;
  }

  moveBullets(world);
  createBullets(world);
}

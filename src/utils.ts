import { World } from './index'

export function random(size: number): number {
  return Math.floor(Math.random() * size);

}
export function pos(i: number, modifier: number, world: World): number {
    return (i + modifier + world.maze.length) % world.maze.length;
}

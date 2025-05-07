import { Scene } from 'phaser';

export class Level1 extends Scene {
  constructor() {
    super('Level1');
  }
  preload() {
    this.load.setPath('assets');
    this.load.image('background', 'FondoMapa1.png');
    this.load.image('tiles', 'tileset.png');
    this.load.tilemapTiledJSON('map', 'Mapita1.json');

    this.load.spritesheet('run', 'RUN.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('jump', 'JUMP.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('attack1', 'ATTACK 1.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('attack2', 'ATTACK 2.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('attack3', 'ATTACK 3.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemy', 'Enemigomapa1.png', { frameWidth: 64, frameHeight: 64 });
  }
}
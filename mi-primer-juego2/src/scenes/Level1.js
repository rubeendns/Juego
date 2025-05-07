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
  create() {
    this.add.image(400, 300, 'background').setScrollFactor(0);
    this.inicializarMapa();

    this.player = this.physics.add.sprite(100, 300, 'run');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(400);

    this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('run'), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'jump', frames: this.anims.generateFrameNumbers('jump'), frameRate: 10 });
    this.anims.create({ key: 'attack1', frames: this.anims.generateFrameNumbers('attack1'), frameRate: 10 });
    this.anims.create({ key: 'attack2', frames: this.anims.generateFrameNumbers('attack2'), frameRate: 10 });
    this.anims.create({ key: 'attack3', frames: this.anims.generateFrameNumbers('attack3'), frameRate: 10 });
  }
  inicializarMapa() {
    this.map = this.make.tilemap({ key: 'map' });
    const tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.suelo = this.map.createLayer('Capa de patrones 1', tileset, 0, 0);
    this.suelo.setCollisionByProperty({ colision: true });
  }
  update(){

  }
}
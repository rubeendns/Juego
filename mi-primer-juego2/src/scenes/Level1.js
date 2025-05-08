import { Scene } from 'phaser';

export class Level1 extends Scene {
  constructor() {
    super('Level1');
  }

  preload() {
    this.load.setPath('assets/tilemaps');
    this.load.tilemapTiledJSON('map', 'Mapita1.json');

    this.load.setPath('assets');
    this.load.image('background', 'FondoMapa1.png');

    this.load.setPath('assets/tilesets');
    this.load.image('tiles', 'tileset.png');

    this.load.setPath('assets/Imagenes/Personaje');
    this.load.spritesheet('run', 'RUN.png', { frameWidth: 96, frameHeight: 84 });
    this.load.spritesheet('jump', 'JUMP.png', { frameWidth: 96, frameHeight: 84 });
    this.load.spritesheet('attack1', 'ATTACK 1.png', { frameWidth: 96, frameHeight: 84 });
    this.load.spritesheet('attack2', 'ATTACK 2.png', { frameWidth: 96, frameHeight: 84 });
    this.load.spritesheet('attack3', 'ATTACK 3.png', { frameWidth: 96, frameHeight: 84 });

    this.load.setPath('assets/Imagenes/Enemigos');
    this.load.spritesheet('enemy', 'Enemigomapa1.png', { frameWidth: 110, frameHeight: 90 });
  }

  create() {
    this.add.image(400, 300, 'background').setScrollFactor(0);
    this.inicializarMapa();

    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.player = this.physics.add.sprite(100, 670, 'run');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(400);
    this.player.setSize(35, 40).setOffset(30, 24);

    this.estaAtacando = false;

    this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('run', { start: 0, end: 4 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('run', { start: 0, end: 4 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'jump', frames: this.anims.generateFrameNumbers('jump'), frameRate: 10 });
    this.anims.create({ key: 'attack1', frames: this.anims.generateFrameNumbers('attack1', { start: 0, end: 5}), frameRate: 10, repeat: 0 });
    this.anims.create({ key: 'attack2', frames: this.anims.generateFrameNumbers('attack2', { start: 0, end: 4}), frameRate: 10, repeat: 0 });
    this.anims.create({ key: 'attack3', frames: this.anims.generateFrameNumbers('attack3', { start: 0, end: 5}), frameRate: 10, repeat: 0 });

    this.player.on('animationcomplete', (anim) => {
      if (anim.key.startsWith('attack')) {
        this.estaAtacando = false;
      }
    });

    

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyP = this.input.keyboard.addKey('P');
    this.keyO = this.input.keyboard.addKey('O');

    this.enemigos = this.physics.add.group();
    this.enemigo1 = this.enemigos.create(550, 600, 'enemy'); // enemigo de arriba movido a la izquierda
    this.enemigo2 = this.enemigos.create(900, 300, 'enemy'); // enemigo en plataforma derecha
    this.enemigo3 = this.enemigos.create(750, 100, 'enemy'); // nuevo enemigo abajo a la izquierda

    this.anims.create({ key: 'enemy_walk', frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 15 }), frameRate: 8, repeat: -1 });
    // Configurar patrullaje y animación para cada enemigo
    this.enemigo1.direccion = 1;
    this.enemigo1.rango = { min: 520, max: 600 };
    this.enemigo1.setVelocityX(20);
    this.enemigo1.anims.play('enemy_walk', true);
    this.enemigo1.setSize(50, 60).setOffset(30, 24);

    this.enemigo2.direccion = 1;
    this.enemigo2.rango = { min: 880, max: 950 };
    this.enemigo2.setVelocityX(20);
    this.enemigo2.anims.play('enemy_walk', true);
    this.enemigo2.setSize(50, 70).setOffset(30, 24);

    this.enemigo3.direccion = 1;
    this.enemigo3.rango = { min: 700, max: 800 };
    this.enemigo3.setVelocityX(20);
    this.enemigo3.anims.play('enemy_walk', true);
    this.enemigo3.setSize(50, 70).setOffset(30, 24);

    this.physics.add.collider(this.player, this.suelo);
    this.physics.add.collider(this.enemigos, this.suelo);
    this.physics.add.collider(this.player, this.enemigos);

    

    
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
  }

  inicializarMapa() {
    this.map = this.make.tilemap({ key: 'map' });
    const tileset = this.map.addTilesetImage('TILED1', 'tiles'); // Nombre exacto como aparece en Tiled
    this.suelo = this.map.createLayer('tierra1', tileset, 0, 0);
  
    // Esta línea activa las colisiones según lo que dibujaste en Tiled
    this.suelo.setCollisionByExclusion([-1]);

  
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.suelo.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255),
      faceColor: new Phaser.Display.Color(0, 255, 0, 255)
    });
  }
  
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.estaAtacando = true;
      this.player.setVelocityX(0);
      this.player.anims.play('attack1', true);
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
      this.estaAtacando = true;
      this.player.setVelocityX(0);
      this.player.anims.play('attack2', true);
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyO)) {
      this.estaAtacando = true;
      this.player.setVelocityX(0);
      this.player.anims.play('attack3', true);
    }

    if (this.estaAtacando) return;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.flipX = true;
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.flipX = false;
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.stop();
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-450);
      this.player.anims.play('jump', true);
    }
    // Patrullaje automático de los enemigos
    [this.enemigo1, this.enemigo2, this.enemigo3].forEach((enemigo) => {
    if (!enemigo || !enemigo.rango) return;
  
    if (enemigo.x <= enemigo.rango.min) {
      enemigo.direccion = 1;
    } else if (enemigo.x >= enemigo.rango.max) {
      enemigo.direccion = -1;
    }
  
    enemigo.setVelocityX(50 * enemigo.direccion);
    enemigo.flipX = enemigo.direccion > 0;
    enemigo.anims.play('enemy_walk', true);
  });
  
  }
}

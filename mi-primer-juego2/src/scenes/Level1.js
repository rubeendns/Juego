import { Scene } from 'phaser';
import { globals } from '../utils/global.js';

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
    this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
    for (let i = 0; i <= 5; i++) this.load.image(`${i}vidas`, `assets/${i}.png`);
  }

  create() {
    
    this.add.image(400, 300, 'background').setScrollFactor(0);
    this.inicializarMapa();
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.player = this.crearJugador(100, 670);
    this.physics.add.collider(this.player, this.suelo);

   
    if (globals.jugadores === 2) {
      this.player2 = this.crearJugador(150, 670);
      this.physics.add.collider(this.player2, this.suelo);
    }

    
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    
    this.vida = 5;
    this.barraVida = this.add.image(60, 40, '5vidas').setScrollFactor(0);

    
    const pausa = this.add.text(740, 20, '⏸', {
      fontSize: '32px', backgroundColor: '#333', color: '#fff',
      padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setInteractive()
      .on('pointerdown', () => {
        this.scene.pause();
        this.mostrarMenuPausa();
      });

    
    this.enemigos = this.physics.add.group();
    this.anims.create({
        key: 'enemigo_izquierda',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
      
      this.anims.create({
        key: 'enemigo_derecha',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
      
      
    for (let i = 0; i < 3; i++) {
      const x = Phaser.Math.Between(100, this.map.widthInPixels - 100);
      const enemigo = this.enemigos.create(x, 0, 'dude');
      enemigo.setBounce(0).setCollideWorldBounds(true).setVelocityX(100);
      enemigo.direccion = 1;
      enemigo.vidas = 2;
      enemigo.anims.play('enemigo_derecha');


    }
    this.physics.add.collider(this.enemigos, this.suelo);
    this.physics.add.collider(this.enemigos, this.player, this.colisionConJugador, null, this);
    if (globals.jugadores === 2) {
      this.physics.add.collider(this.enemigos, this.player2, this.colisionConJugador, null, this);
    }
  }

  crearJugador(x, y) {
    const jugador = this.physics.add.sprite(x, y, 'run');
    jugador.setBounce(0.1).setCollideWorldBounds(true).body.setGravityY(400);
    jugador.setSize(35, 40).setOffset(30, 24);
    jugador.estaAtacando = false;
    jugador.invulnerable = false;

    this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('run', { start: 0, end: 4 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('run', { start: 0, end: 4 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'jump', frames: this.anims.generateFrameNumbers('jump'), frameRate: 10 });
    this.anims.create({ key: 'attack1', frames: this.anims.generateFrameNumbers('attack1', { start: 0, end: 5 }), frameRate: 10, repeat: 0 });
    this.anims.create({ key: 'attack2', frames: this.anims.generateFrameNumbers('attack2', { start: 0, end: 4 }), frameRate: 10, repeat: 0 });
    this.anims.create({ key: 'attack3', frames: this.anims.generateFrameNumbers('attack3', { start: 0, end: 5 }), frameRate: 10, repeat: 0 });

    jugador.on('animationcomplete', (anim) => {
      if (anim.key.startsWith('attack')) jugador.estaAtacando = false;
    });

    return jugador;
  }

  mostrarMenuPausa() {
    const fondo = this.add.rectangle(400, 300, 300, 200, 0x000000, 0.8).setScrollFactor(0);
    const menu = this.add.text(400, 270, 'Menú', {
      fontSize: 24, color: '#fff', backgroundColor: '#880000', padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setScrollFactor(0).setInteractive().on('pointerdown', () => {
      this.scene.stop();
      this.scene.start('MenuScene');
    });

    const retry = this.add.text(400, 330, 'Reintentar', {
      fontSize: 24, color: '#fff', backgroundColor: '#222222', padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setScrollFactor(0).setInteractive().on('pointerdown', () => {
      this.scene.restart();
    });
  }

  colisionConJugador(jugador, enemigo) {
    if (!jugador.invulnerable) {
      this.quitarVida(1);
      jugador.invulnerable = true;
      this.time.delayedCall(1000, () => jugador.invulnerable = false);
    }
  }

  quitarVida(cantidad) {
    this.vida -= cantidad;
    this.vida = Phaser.Math.Clamp(this.vida, 0, 5);
    this.barraVida.setTexture(`${this.vida}vidas`);
    if (this.vida <= 0) {
      this.registry.set('lastLevel', 'Level1');
      this.scene.start('GameOverScene');
    }
  }

  inicializarMapa() {
   
    this.map = this.make.tilemap({ key: 'map' });
    const tileset = this.map.addTilesetImage('TILED1', 'tiles');
    this.suelo = this.map.createLayer('tierra1', tileset, 0, 0);
    this.suelo.setCollisionByExclusion([-1]);
  }

  update() {
    // 🔸 AÑADIDO: control enemigos
    this.enemigos.children.iterate((enemigo) => {
        if (enemigo.body.blocked.left || enemigo.body.blocked.right) {
            enemigo.direccion *= -1;
            enemigo.setVelocityX(100 * enemigo.direccion);
          
            if (enemigo.direccion < 0) {
              enemigo.anims.play('enemigo_izquierda', true);
            } else {
              enemigo.anims.play('enemigo_derecha', true);
            }
          }
          
    });

   
    const atacar = (tecla, anim) => {
      if (Phaser.Input.Keyboard.JustDown(tecla)) {
        this.player.estaAtacando = true;
        this.player.setVelocityX(0);
        this.player.anims.play(anim, true);
        const hitbox = this.physics.add.sprite(this.player.x + (this.player.flipX ? -40 : 40), this.player.y, null);
        hitbox.body.setSize(30, 30);
        hitbox.body.allowGravity = false;
        this.physics.add.overlap(hitbox, this.enemigos, (hitbox, enemigo) => {
          enemigo.vidas -= 1;
          if (enemigo.vidas <= 0) {
            enemigo.destroy();
            if (this.enemigos.countActive(true) === 0) {
              this.registry.set('nivelDesbloqueado', 2);
              this.scene.start('WinScene');
            }
          }
        });
        this.time.delayedCall(200, () => hitbox.destroy());
      }
    };

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyP = this.input.keyboard.addKey('P');
    this.keyO = this.input.keyboard.addKey('O');

    atacar(this.cursors.space, 'attack1');
    atacar(this.keyP, 'attack2');
    atacar(this.keyO, 'attack3');

    if (this.player.estaAtacando) return;

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
  }
}
// MenuScene.js
import { nivelDesbloqueado } from '../utils/globals.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.image('menu', 'assets/menu.png'); // Imagen de fondo opcional
  }

  create() {
    
    this.niveles = [
      { nombre: 'Level1', desbloqueado: true },
      { nombre: 'Level2', desbloqueado: nivelDesbloqueado >= 2 },
      { nombre: 'Level3', desbloqueado: nivelDesbloqueado >= 3 },
    ];

    this.niveles.forEach((nivel, index) => {
      const y = 200 + index * 80;

      const estiloTexto = {
        fontSize: 30,
        fontFamily: 'Arial',
        color: nivel.desbloqueado ? '#ffffff' : '#888888',
        backgroundColor: nivel.desbloqueado ? '#222222' : '#444444',
        padding: { x: 20, y: 10 }
      };

      const texto = this.add.text(400, y, nivel.nombre, estiloTexto)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      if (nivel.desbloqueado) {
        texto.on('pointerdown', () => {
          if (nivel.nombre === 'Level1') {
            this.scene.start('PlayerSelectScene');
          } else {
            this.scene.start(nivel.nombre);
          }
        });
      }
    });
  }
}


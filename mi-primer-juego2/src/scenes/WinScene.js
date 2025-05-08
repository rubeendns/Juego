import { globals } from '../utils/global.js';

export class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }

  preload() {
    this.load.image('winImage', 'assets/WinScene.png');
  }

  create() {
    this.add.image(400, 300, 'winImage').setDisplaySize(800, 600);

    const menuButton = this.add.text(200, 500, 'Menú', {
      fontSize: 32,
      fontFamily: 'Arial',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: { x: 20, y: 10 }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.scene.start('MenuScene');
    });

    const nivelActual = this.registry.get('lastLevel');

    if (nivelActual === 'Level1') {
      this.registry.set('nivelDesbloqueado', 2);
      localStorage.setItem('nivelDesbloqueado', 2);
    } else if (nivelActual === 'Level2') {
      this.registry.set('nivelDesbloqueado', 3);
      localStorage.setItem('nivelDesbloqueado', 3);
    }

    const siguienteNivel = nivelActual === 'Level1' ? 'Level2' : nivelActual === 'Level2' ? 'Level3' : null;

    if (siguienteNivel) {
      const nextButton = this.add.text(400, 500, 'Siguiente Nivel', {
        fontSize: 32,
        fontFamily: 'Arial',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: { x: 20, y: 10 }
      })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start(siguienteNivel);
      });
    }
  }
}

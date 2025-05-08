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

    const menuButton = this.add.text(250, 500, 'Menú', {
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
    if (globals.nivelDesbloqueado < 3) {
        const siguienteNivel = globals.nivelDesbloqueado + 1;
        const siguienteScene = 'Level' + siguienteNivel;
    
        const nextButton = this.add.text(550, 527, 'Siguiente Nivel', {
          fontSize: 32,
          fontFamily: 'Arial',
          backgroundColor: '#008800',
          color: '#ffffff',
          padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5).setInteractive().on('pointerdown', () => {
            const nivel = this.registry.get('nivelDesbloqueado');
            if (nivel === 2) {
              this.scene.start('Level2');
            } else if (nivel === 3) {
              this.scene.start('Level3');
            }
        });
  }
    }
}


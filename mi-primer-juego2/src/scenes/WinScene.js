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
  }
}
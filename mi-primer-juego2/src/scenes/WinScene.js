import { globals } from '../utils/global.js';

export class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }
  preload() {
    this.load.image('winImage', 'assets/WinScene.png');
  }
}
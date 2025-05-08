// MenuScene.js
import { nivelDesbloqueado } from '../utils/globals.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.image('menu', 'assets/menu.png'); // Imagen de fondo opcional
  }

}

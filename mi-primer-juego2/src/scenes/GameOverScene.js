export class GameOverScene extends Phaser.Scene {
    constructor() {
      super('GameOverScene');
    }
    preload() {
        this.load.image('gameover', 'assets/GameOver.png'); // Asegúrate de tener esta imagen
      }
}
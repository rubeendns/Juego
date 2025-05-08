export class GameOverScene extends Phaser.Scene {
    constructor() {
      super('GameOverScene');
    }
    preload() {
        this.load.image('gameover', 'assets/GameOver.png'); 
      }
    
    create() {
        this.add.image(400, 300, 'gameover').setDisplaySize(800, 600);
    
        const retryButton = this.add.text(250, 500, 'Reintentar', {
          fontSize: 28,
          fontFamily: 'Arial',
          backgroundColor: '#222222',
          color: '#ffffff',
          padding: { x: 20, y: 10 }
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.scene.start(this.registry.get('lastLevel') || 'Level1'); 
        });
        const menuButton = this.add.text(450, 500, 'Menú', {
            fontSize: 28,
            fontFamily: 'Arial',
            backgroundColor: '#880000',
            color: '#ffffff',
            padding: { x: 20, y: 10 }
          })
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.scene.start('MenuScene');
          });
    }
 }
    

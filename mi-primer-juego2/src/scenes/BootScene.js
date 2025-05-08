// BootScene.js
export class BootScene extends Phaser.Scene {
    constructor() {
      super('BootScene');
    }
  
    preload() {
      this.load.image('fondo', 'assets/Boot.png'); // Imagen portada con "Dodge Death"
    }
  
    create() {
      // Mostrar fondo portada
      this.add.image(400, 300, 'fondo').setDisplaySize(800, 600);
  
      // Botón interactivo "EMPEZAR"
      const startText = this.add.text(260, 500, 'EMPEZAR', {
        fontFamily: 'Arial Black',
        fontSize: 40,
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 30, y: 15 },
        align: 'center'
      }).setInteractive();
  
      startText.on('pointerdown', () => {
        this.scene.start('MenuScene');
      });
  
      startText.on('pointerover', () => {
        startText.setStyle({ backgroundColor: '#444444' });
      });
  
      startText.on('pointerout', () => {
        startText.setStyle({ backgroundColor: '#000000' });
      });
    }
  }
  
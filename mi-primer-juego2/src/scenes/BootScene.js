export class BootScene extends Phaser.Scene {
    constructor() {
      super('BootScene');
    }
  
    preload() {
      this.load.image('fondo', 'assets/boot.png'); 
    }
  
    create() {
      this.add.image(400, 300, 'fondo').setDisplaySize(800, 600);
  
      // Botón interactivo "Empezar"
      const empezarTexto = this.add.text(320, 500, 'EMPEZAR', {
        fontFamily: 'Arial Black',
        fontSize: 40,
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 20, y: 10 },
        align: 'center'
      }).setInteractive();
  
      empezarTexto.on('pointerdown', () => {
        this.scene.start('MenuScene');
      });
  
      empezarTexto.on('pointerover', () => {
        empezarTexto.setStyle({ backgroundColor: '#444444' });
      });
  
      empezarTexto.on('pointerout', () => {
        empezarTexto.setStyle({ backgroundColor: '#000000' });
      });
    }
  }
  
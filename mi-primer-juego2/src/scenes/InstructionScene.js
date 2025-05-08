import { globals } from '../utils/global.js';

export class InstructionScene extends Phaser.Scene {
  constructor() {
    super('InstructionScene');
  }
  create() {
    this.add.text(400, 60, 'Controles', {
      fontFamily: 'Arial',
      fontSize: 32,
      color: '#ffffff'
    }).setOrigin(0.5);
  
    const textoJ1 = 
  `Jugador 1:
  Mover: Flechas (← ↑ →)
  Ataque 1: ESPACIO
  Ataque 2: P
  Ataque 3: O`;
  
    const textoJ2 = 
  `Jugador 2:
  Mover: A (izq), W (saltar), D (der)
  Ataque 1: E
  Ataque 2: R
  Ataque 3: T`;
  
    this.add.text(50, 160, textoJ1, {
      fontFamily: 'Courier',
      fontSize: 20,
      color: '#ffffff',
      align: 'left'
    });
  
    if (globals.jugadores === 2) {
      this.add.text(50, 280, textoJ2, {
        fontFamily: 'Courier',
        fontSize: 20,
        color: '#ffffff',
        align: 'left'
      });
    }
  
    const startButton = this.add.text(400, 450, 'EMPEZAR', {
      fontFamily: 'Arial Black',
      fontSize: 28,
      color: '#ffffff',
      backgroundColor: '#00aa00',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();
  
    startButton.on('pointerdown', () => {
      this.scene.start('Level1');
    });
  }  
}
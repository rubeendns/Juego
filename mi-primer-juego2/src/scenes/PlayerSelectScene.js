import { setJugadores } from '../utils/global.js';

export class PlayerSelectScene extends Phaser.Scene {
  constructor() {
    super('PlayerSelectScene');
  }

  create() {
    this.add.text(400, 100, 'Selecciona número de jugadores', {
      fontSize: 26,
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    const boton1 = this.add.text(300, 250, '1 Jugador', {
      fontSize: 24,
      color: '#ffffff',
      backgroundColor: '#222222',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const boton2 = this.add.text(500, 250, '2 Jugadores', {
      fontSize: 24,
      color: '#ffffff',
      backgroundColor: '#222222',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    boton1.on('pointerdown', () => {
      setJugadores(1);
      this.scene.start('InstructionScene');
    });

    boton2.on('pointerdown', () => {
      setJugadores(2);
      this.scene.start('InstructionScene');
    });
  }
}
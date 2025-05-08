import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
/*import { MenuScene } from './scenes/MenuScene.js';
import { PlayerSelectScene } from './scenes/PlayerSelectScene.js';
import { InstructionScene } from './scenes/InstructionScene.js';*/
import { Level1 } from './scenes/Level1.js';
/*import { Level2 } from './scenes/Level2.js';
import { Level3 } from './scenes/Level3.js';
import { WinScene } from './scenes/WinScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';*/

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [BootScene,
        Level1]
};

export default new Phaser.Game(config);



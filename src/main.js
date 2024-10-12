import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { Preloader } from './scenes/Preloader';

const DISPLAY_WIDTH =  11 * 16; // Number of tiles * size of the tile
const DISPLAY_HEIGHT =  11 * 16; // Number of tiles * size of the tile
const GRAVITY = 500

const config = {
    type: Phaser.AUTO,
    width: DISPLAY_WIDTH, // Number of tiles * size of the tile
    height: DISPLAY_HEIGHT,
    zoom: 4,
    parent: 'game-container',

    scene: [
        Boot,
        Preloader,
        Game,
        GameOver
    ],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GRAVITY },
            debug: false
        }
    }
};

export default new Phaser.Game(config);

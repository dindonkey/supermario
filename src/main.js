import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

export const DISPLAY_WIDTH =  11 * 16; // Number of tiles * size of the tile
export const DISPLAY_HEIGHT =  11 * 16; // Number of tiles * size of the tile

const config = {
    type: Phaser.AUTO,
    width: DISPLAY_WIDTH, // Number of tiles * size of the tile
    height: DISPLAY_HEIGHT,
    zoom: 4,
    parent: 'game-container',
    backgroundColor: '#028af8',

    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    }
};

export default new Phaser.Game(config);

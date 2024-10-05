import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    preload ()
    {
        this.load.image('super_mario_tiles', 'assets/super-mario.png')
        this.load.image('mario', 'assets/mario.png')
        this.load.tilemapTiledJSON('tilemap', 'assets/super_mario_level.json')
    }

    create ()
    {
        this.scene.start('Game');
    }
}

import { Scene } from 'phaser';
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from '../main';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // create map
        const map = this.make.tilemap({ key: 'tilemap' })
        const worldWidth = map.tileWidth * map.width;
        const worldHeight = map.tileHeight * map.height;
        const tileset = map.addTilesetImage('super-mario', 'super_mario_tiles')
        // create background layer
        map.createLayer('Background', tileset)    
        // create platform layer and set collision on its tiles 
        const platformTilesLayer = map.createLayer('Platforms', tileset)
        platformTilesLayer.setCollisionByExclusion([-1])

        // create player and set collision on word bounds
        this.player = this.physics.add.image(16, 0, 'mario');
        this.player.setCollideWorldBounds(true);

        // add player and platform layer collision
        this.physics.add.collider(this.player, platformTilesLayer);

        // grap keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // set camera
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight)
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.startFollow(this.player);
    }

    update () {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        }
        else {
            this.player.setVelocityX(0);
        }
    
        if (this.cursors.up.isDown ) {
            this.player.setVelocityY(-130);
        }
    }
}

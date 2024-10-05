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
        this.player =  this.physics.add.sprite(15, 0, 'mario');
        this.playerDirection = 'right'
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mario', { start: 3, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mario', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn-right',
            frames: [{ key: 'mario', frame: 5 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'turn-left',
            frames: [{ key: 'mario', frame: 4 }],
            frameRate: 20
        });

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
            this.playerDirection = 'left';
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.playerDirection = 'right';
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play(`turn-${this.playerDirection}`);
        }
    
        if (this.cursors.up.isDown ) {
            this.player.setVelocityY(-130);
        }
    }
}

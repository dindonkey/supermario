import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    const { worldWidth, worldHeight, platformTilesLayer } =
      this._createTileMap();

    this._createPlayer();
    this._createAnimations();

    this.physics.add.collider(this.player, platformTilesLayer);
    this.cursors = this.input.keyboard.createCursorKeys();
    this._configureCamera(worldWidth, worldHeight, this.player);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.playerDirection = "left";
      if (this.player.body.blocked.down) {
        this.player.anims.play("left", true);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.playerDirection = "right";
      if (this.player.body.blocked.down) {
        this.player.anims.play("right", true);
      }
    } else {
      this.player.setVelocityX(0);
      if (this.player.body.blocked.down) {
        this.player.anims.play(`turn-${this.playerDirection}`);
      }
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-230);
      this.player.anims.play(`jump-${this.playerDirection}`);
    }
  }

  _createTileMap() {
    // create map
    const map = this.make.tilemap({ key: "tilemap" });
    const worldWidth = map.tileWidth * map.width;
    const worldHeight = map.tileHeight * map.height;
    const tileset = map.addTilesetImage("super-mario", "super_mario_tiles");
    // create background layer
    map.createLayer("Background", tileset);
    // create ground layer and set collision on its tiles
    const platformTilesLayer = map.createLayer('Ground', tileset);
    platformTilesLayer.setCollisionByExclusion([-1]);
    // create bricks
    this.bricks = this.physics.add.staticGroup();
    this.bricksLayer = map.getObjectLayer('Bricks');
    this.bricksLayer.objects.forEach(element => {
      // console.log(element.x, element.y, element.width, element.height)
      this.bricks.create(element.x, element.y, 'brick');

    });


    return { worldWidth, worldHeight, platformTilesLayer };
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(32, 0, "mario");
    this.playerDirection = "right";
    this.player.setCollideWorldBounds(true);
  }

  _createAnimations() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("mario", { start: 3, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("mario", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn-right",
      frames: [{ key: "mario", frame: 5 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "turn-left",
      frames: [{ key: "mario", frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "jump-right",
      frames: [{ key: "mario", frame: 9 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "jump-left",
      frames: [{ key: "mario", frame: 0 }],
      frameRate: 20,
    });
  }

  _configureCamera(width, height, player) {
    this.physics.world.setBounds(0, 0, width, height);
    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.startFollow(player);
  }
}

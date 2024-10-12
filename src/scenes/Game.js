import { Scene } from "phaser";
import Player from "../models/player";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    const { worldWidth, worldHeight, platformTilesLayer } =
      this._createTileMap();

    this.player = new Player({ scene: this, x: 32, y: 0 });
    
    this.physics.add.collider(this.player, platformTilesLayer);
    this.physics.add.collider(
      this.player,
      this.bricks,
      this._hitBrick,
      null,
      this
    );

    this._configureCamera(worldWidth, worldHeight, this.player);
  }

  update() {
    this.player.update();
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
    const platformTilesLayer = map.createLayer("Ground", tileset);
    platformTilesLayer.setCollisionByExclusion([-1]);

    // create bricks
    this.bricks = this.physics.add.staticGroup();
    this.bricksLayer = map.getObjectLayer("Bricks");
    this.bricksLayer.objects.forEach((element) => {
      this.bricks.create(element.x, element.y, "brick");
    });

    return { worldWidth, worldHeight, platformTilesLayer };
  }

  _configureCamera(width, height, player) {
    this.physics.world.setBounds(0, 0, width, height);
    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.startFollow(player);
  }

  _hitBrick(player, brick) {
    console.log(brick);
    this.tweens.add({
      targets: brick,
      y: "-=5",
      ease: "Linear",
      yoyo: true,
      duration: 100,
    });
  }
}

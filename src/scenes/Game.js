import { Scene } from "phaser";
import Player from "../models/player";
import BricksGroup from "../models/bricksGroup";
import PlayerBricksCollider from "../models/playerBricksCollider";

const PLAYER_SPAWN_X = 32;
const PLAYER_SPAWN_Y = 0;

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    const { worldWidth, worldHeight, platformTilesLayer } =
      this._createTileMap();
    this.player = new Player({
      scene: this,
      x: PLAYER_SPAWN_X,
      y: PLAYER_SPAWN_Y,
    });

    // create bricks
    this.bricks = new BricksGroup({
      scene: this,
      objectLayer: this.map.getObjectLayer("Bricks"),
    });

    this.physics.add.collider(this.player, platformTilesLayer);
    this.playerBricksCollider = new PlayerBricksCollider({
      scene: this,
      player: this.player,
      bricks: this.bricks,
    });

    this._configureCamera(worldWidth, worldHeight, this.player);
  }

  update() {
    this.player.update();
  }

  _createTileMap() {
    // create map
    this.map = this.make.tilemap({ key: "tilemap" });
    const worldWidth = this.map.tileWidth * this.map.width;
    const worldHeight = this.map.tileHeight * this.map.height;
    const tileset = this.map.addTilesetImage(
      "super-mario",
      "super_mario_tiles"
    );
    // create background layer
    this.map.createLayer("Background", tileset);
    // create ground layer and set collision on its tiles
    const platformTilesLayer = this.map.createLayer("Ground", tileset);
    platformTilesLayer.setCollisionByExclusion([-1]);

    return { worldWidth, worldHeight, platformTilesLayer };
  }

  _configureCamera(width, height, player) {
    this.physics.world.setBounds(0, 0, width, height);
    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.startFollow(player);
  }
}

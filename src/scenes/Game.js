import { Scene } from "phaser";
import Player from "../models/player";
import BricksGroup from "../models/bricksGroup";
import PlayerBricksCollider from "../models/playerBricksCollider";
import LevelMap from "../models/levelMap";

const PLAYER_SPAWN_X = 32;
const PLAYER_SPAWN_Y = 0;

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.levelMap = new LevelMap(this)
    this.player = new Player({
      scene: this,
      x: PLAYER_SPAWN_X,
      y: PLAYER_SPAWN_Y,
    });

    // create bricks
    this.bricks = new BricksGroup({
      scene: this,
      objectLayer: this.levelMap.map.getObjectLayer("Bricks"),
    });

    this.physics.add.collider(this.player, this.levelMap.groundLayer);
    this.playerBricksCollider = new PlayerBricksCollider({
      scene: this,
      player: this.player,
      bricks: this.bricks,
    });

    this._configureCamera(this.levelMap.worldWidth, this.levelMap.worldHeight, this.player);
  }

  update() {
    this.player.update();
  }

  _configureCamera(width, height, player) {
    this.physics.world.setBounds(0, 0, width, height);
    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.startFollow(player);
  }
}

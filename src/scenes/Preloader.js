import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("super_mario_tiles", "assets/super-mario.png");
    this.load.image("brick", "assets/brick.png");
    this.load.tilemapTiledJSON("tilemap", "assets/super_mario_level.json");
    this.load.spritesheet("mario", "assets/mario_sprite.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.scene.start("Game");
  }
}

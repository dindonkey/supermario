import { Scene } from "phaser";

export const SUPER_MARIO_TILES_KEY = 'super_mario_tiles';
export const SUPER_MARIO_TILESET_NAME = "super-mario"; // must match json tileset name
export const BRICK_SPRITE_KEY = 'brick';
export const LEVEL_TILEMAP_KEY = 'tilemap';
export const MARIO_SPRITE_KEY = 'mario';

class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image(SUPER_MARIO_TILES_KEY, "assets/super-mario.png");
    this.load.image(BRICK_SPRITE_KEY, "assets/brick.png");
    this.load.tilemapTiledJSON(LEVEL_TILEMAP_KEY, "assets/super_mario_level.json");
    this.load.spritesheet(MARIO_SPRITE_KEY, "assets/mario_sprite.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.scene.start("Game");
  }
}

export default Preloader;

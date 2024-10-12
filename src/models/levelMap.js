const TILEMAP_KEY = "tilemap";
const TILESET_NAME = "super-mario"; // match json tileset name
const TILES_KEY = "super_mario_tiles";
const BACKGROUND_LAYER = "Background";
const GROUND_LAYER = "Ground";

class LevelMap {
  constructor(scene) {
    this.map = scene.make.tilemap({ key: TILEMAP_KEY });
    this.worldWidth = this.map.tileWidth * this.map.width;
    this.worldHeight = this.map.tileHeight * this.map.height;

    // load tileset
    const tileset = this.map.addTilesetImage(TILESET_NAME, TILES_KEY);

    // create background layer
    this.map.createLayer(BACKGROUND_LAYER, tileset);

    // create ground layer and set collision on its tiles
    this.groundLayer = this.map
      .createLayer(GROUND_LAYER, tileset)
      .setCollisionByExclusion([-1]);
  }
}

export default LevelMap;

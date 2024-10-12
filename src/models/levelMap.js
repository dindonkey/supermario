const TILEMAP_KEY = "tilemap";
const TILESET_NAME = "super-mario"; // match json tileset name
const TILES_KEY = "super_mario_tiles";
const BACKGROUND_LAYER = "Background";
const GROUND_LAYER = "Ground";
const BRICKS_LAYER = "Bricks";

class LevelMap {
  constructor(scene) {
    const map = scene.make.tilemap({ key: TILEMAP_KEY });
    this.worldWidth = map.tileWidth * map.width;
    this.worldHeight = map.tileHeight * map.height;

    // load tileset
    const tileset = map.addTilesetImage(TILESET_NAME, TILES_KEY);

    // create background layer
    map.createLayer(BACKGROUND_LAYER, tileset);

    // create ground layer and set collision on its tiles
    this.groundLayer = map
      .createLayer(GROUND_LAYER, tileset)
      .setCollisionByExclusion([-1]);

    this.bricksLayer = map.getObjectLayer(BRICKS_LAYER);
  }
}

export default LevelMap;

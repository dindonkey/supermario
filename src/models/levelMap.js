import {
  LEVEL_TILEMAP_KEY,
  SUPER_MARIO_TILESET_NAME,
  SUPER_MARIO_TILES_KEY
} from "../scenes/Preloader";

const BACKGROUND_LAYER = "Background";
const GROUND_LAYER = "Ground";
const BRICKS_LAYER = "Bricks";

class LevelMap {
  constructor(scene) {
    const map = scene.make.tilemap({ key: LEVEL_TILEMAP_KEY });
    this.worldWidth = map.tileWidth * map.width;
    this.worldHeight = map.tileHeight * map.height;

    // load tileset
    const tileset = map.addTilesetImage(SUPER_MARIO_TILESET_NAME, SUPER_MARIO_TILES_KEY);

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

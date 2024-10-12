import { Physics } from "phaser";
import { BRICK_SPRITE_KEY } from "../scenes/Preloader";

class Brick extends Physics.Arcade.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, BRICK_SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
  }
}

export default Brick;

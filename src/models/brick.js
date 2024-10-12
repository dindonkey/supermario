import { Physics } from "phaser";

const SPRITE_KEY = "brick";

class Brick extends Physics.Arcade.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
  }

  _hitBrick(_, brick) {
    this.tweens.add({
      targets: brick,
      y: "-=5",
      ease: "Linear",
      yoyo: true,
      duration: 100,
    });
  }
}

export default Brick;

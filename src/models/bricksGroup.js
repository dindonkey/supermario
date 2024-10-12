import { Physics } from "phaser";
import Brick from "./brick";

class BricksGroup extends Physics.Arcade.StaticGroup {
  constructor({ scene, objectLayer }) {
    super(scene);
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
    objectLayer.objects.forEach((element) => {
      this.add(new Brick({ scene: scene, x: element.x, y: element.y }));
    });
  }
}

export default BricksGroup;

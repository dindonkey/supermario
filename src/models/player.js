import { Physics } from "phaser";
import { MARIO_SPRITE_KEY } from "../scenes/Preloader";

const LEFT = 'left';
const RIGHT = 'right';
const WALK_LEFT_ANIM_KEY = 'walk-left';
const WALK_RIGHT_ANIM_KEY = 'walk-right';
const TURN_ANIM_KEY = 'turn';
const JUMP_ANIM_KEY = 'jump';
const VELOCITY_X = 160;
const VELOCITY_Y = 230;

class Player extends Physics.Arcade.Sprite {

  constructor({ scene, x, y}) {
    super(scene, x ,y, MARIO_SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this, false);
    this.playerDirection = RIGHT;
    this.setCollideWorldBounds(true);
    this._createAnimations();
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(VELOCITY_X*-1);
      this.playerDirection = LEFT;

      if (this.body.blocked.down) {
        this.anims.play(WALK_LEFT_ANIM_KEY, true);
      }
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(VELOCITY_X);
      this.playerDirection = RIGHT;
      if (this.body.blocked.down) {
        this.anims.play(WALK_RIGHT_ANIM_KEY, true);
      }
    } else {
      this.setVelocityX(0);
      if (this.body.blocked.down) {
        this.anims.play(`${TURN_ANIM_KEY}-${this.playerDirection}`);
      }
    }

    if (this.cursors.up.isDown && this.body.blocked.down) {
      this.setVelocityY(VELOCITY_Y*-1);
      this.anims.play(`${JUMP_ANIM_KEY}-${this.playerDirection}`);
    }
  }

  _createAnimations() {
    this.anims.create({
      key: WALK_LEFT_ANIM_KEY,
      frames: this.anims.generateFrameNumbers(MARIO_SPRITE_KEY, { start: 3, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: WALK_RIGHT_ANIM_KEY,
      frames: this.anims.generateFrameNumbers(MARIO_SPRITE_KEY, { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${TURN_ANIM_KEY}-${RIGHT}`,
      frames: [{ key: MARIO_SPRITE_KEY, frame: 5 }],
      frameRate: 20,
    });
    this.anims.create({
      key: `${TURN_ANIM_KEY}-${LEFT}`,
      frames: [{ key: MARIO_SPRITE_KEY, frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: `${JUMP_ANIM_KEY}-${RIGHT}`,
      frames: [{ key: MARIO_SPRITE_KEY, frame: 9 }],
      frameRate: 20,
    });
    this.anims.create({
      key: `${JUMP_ANIM_KEY}-${LEFT}`,
      frames: [{ key: MARIO_SPRITE_KEY, frame: 0 }],
      frameRate: 20,
    });
  }
}

export default Player;
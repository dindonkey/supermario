class PlayerBricksCollider {
  constructor({scene, player, bricks}) {
    scene.physics.add.collider(
      player,
      bricks,
      this._hitBrick,
      null,
      scene
    );
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

export default PlayerBricksCollider;

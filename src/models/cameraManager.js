class CameraManager {
    constructor({scene, player, width, height}) {
        scene.physics.world.setBounds(0, 0, width, height);
        scene.cameras.main.setBounds(0, 0, width, height);
        scene.cameras.main.startFollow(player);
    }
}

export default CameraManager;
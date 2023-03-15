import * as CANNON from "cannon-es";

export class ObjectPhysics {
  constructor(mesh) {
    const halfExtents = new CANNON.Vec3(
      mesh.geometry.parameters.width / 2,
      mesh.geometry.parameters.height / 2,
      mesh.geometry.parameters.depth / 2
    );
    const shape = new CANNON.Box(halfExtents);

    this.body = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(
        mesh.position.x,
        mesh.position.y,
        mesh.position.z
      ),
      shape: shape,
    });

    this.body.quaternion.setFromEuler(
      mesh.rotation.x,
      mesh.rotation.y,
      mesh.rotation.z,
      "XYZ"
    );
  }
}

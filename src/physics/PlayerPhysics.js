import * as CANNON from "cannon-es";

export class PlayerPhysics {
  constructor(position) {
    const radius = 0.5;
    const shape = new CANNON.Sphere(radius);

    this.body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(position.x, position.y, position.z),
      shape: shape,
    });

    this.body.linearDamping = 0.9;
  }
}

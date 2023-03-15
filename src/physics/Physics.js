import * as CANNON from "cannon-es";
import { ObjectPhysics } from "./ObjectPhysics";
import { PlayerPhysics } from "./PlayerPhysics";

export class Physics {
  constructor() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;
    this.fixedTimeStep = 1.0 / 60.0;
  }

  createCharacter(position) {
    const playerPhysics = new PlayerPhysics(position);
    this.world.addBody(playerPhysics.body);
    return playerPhysics;
  }

  createGround(ground) {
    const objectPhysics = new ObjectPhysics(ground);
    this.world.addBody(objectPhysics.body);
    return objectPhysics;
  }

  update() {
    this.world.step(this.fixedTimeStep);
  }
}

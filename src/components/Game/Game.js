import React, { Component } from "react";
import * as THREE from "three";
import { Physics } from "../../physics/Physics";
import InputHandler from "../../utils/InputHandler";
import HUD from "../HUD/HUD";
import "./Game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.inputHandler = new InputHandler();
    console.log("Game constructor");
  }

  componentDidMount() {
    console.log("Game componentDidMount");

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initPhysics();
    this.initCharacter();
    this.initGround();
    this.animate();

    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    this.inputHandler.dispose();
    this.stopAnimation();

    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  initScene() {
    this.scene = new THREE.Scene();
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 5);
    this.camera.lookAt(0, 0, 0);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.current,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initPhysics() {
    this.physics = new Physics();
  }

  initCharacter() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(0, 0.5, 0);
    this.character.userData.physics = this.physics.createCharacter(
      this.character.position
    );
    this.scene.add(this.character);
  }

  initGround() {
    const geometry = new THREE.PlaneGeometry(20, 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = Math.PI / 2;
    ground.userData.physics = this.physics.createGround(ground);
    this.scene.add(ground);
  }

  animate() {
    this.physics.update();

    if (
      this.character.userData.physics &&
      this.character.userData.physics.position
    ) {
      this.character.position.copy(this.character.userData.physics.position);
      this.character.quaternion.copy(
        this.character.userData.physics.quaternion
      );
    }

    this.handleCharacterMovement();

    this.animationId = requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  stopAnimation() {
    cancelAnimationFrame(this.animationId);
  }

  handleCharacterMovement() {
    console.log("Handling character movement");

    const speed = 5;

    if (
      this.character &&
      this.character.userData.physics &&
      this.character.userData.physics.velocity
    ) {
      const velocity = this.character.userData.physics.velocity;

      if (this.inputHandler.isKeyPressed("ArrowUp")) {
        velocity.z = -speed;
      } else if (this.inputHandler.isKeyPressed("ArrowDown")) {
        velocity.z = speed;
      } else {
        velocity.z = 0;
      }

      if (this.inputHandler.isKeyPressed("ArrowLeft")) {
        velocity.x = -speed;
      } else if (this.inputHandler.isKeyPressed("ArrowRight")) {
        velocity.x = speed;
      } else {
        velocity.x = 0;
      }
    }
  }

  render() {
    return (
      <div className="Game">
        {this.character && <HUD characterPosition={this.character.position} />}
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}

export default Game;

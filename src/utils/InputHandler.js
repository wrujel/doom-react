class InputHandler {
  constructor() {
    this.keys = {};

    this.onKeyDown = (event) => {
      this.keys[event.key] = true;
    };

    this.onKeyUp = (event) => {
      this.keys[event.key] = false;
    };

    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  isKeyPressed(key) {
    console.log("Checking key:", key, this.keys[key]);
    return !!this.keys[key];
  }

  dispose() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  }
}

export default InputHandler;

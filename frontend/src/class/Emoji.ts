class Emoji {
  #isOn = false;
  #elapsedTime = 0;
  #screenWidth: number;
  #screenHeight: number;
  #sprite: PIXI.Sprite;
  // property types

  constructor(screenWidth: number, screenHeight: number, x: number, y: number) {
    this.#screenWidth = screenWidth;
    this.#screenHeight = screenHeight;
    this.#sprite = PIXI.Sprite.from("/crying-emoji.png");
    this.#sprite.x = x || this.#screenWidth / 2;
    this.#sprite.y = y || Math.floor(Math.random() * this.#screenHeight);
    this.#sprite.anchor.set(0.5);

    app.stage.addChild(this.#sprite);
    // send data to server
    ws.send(
      JSON.stringify({
        // topic: TOPICS.GAME_CHANNEL,
        type: GAME_TYPES.SEND_DATA,
        x: this.#sprite.x,
        y: this.#sprite.y,

        // x: this.#sprite.x,
      })
    );
  }

  update(ws: WebSocket, deltaTime: number): void {
    // sprite.x += ;
    // this.#elapsedTime += deltaTime;
    // this.#sprite.x += Math.cos(this.#elapsedTime / 50) * 10;
  }
}

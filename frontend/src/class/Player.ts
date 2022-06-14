import { Application, Sprite } from "pixi.js";
import { TYPES } from "../../../backend/src/TOPICS";
import { ws } from "../sockets/websocket";

export default class Player {
  sprite: Sprite;
  username: string;
  x: number;
  y: number;
  ws: WebSocket;
  constructor(app: Application, username: string) {
    this.sprite = Sprite.from("moon.png");
    this.username = username;
    this.sprite.anchor.set(0.5);
    this.sprite.position.x = this.x = Math.floor(Math.random() * app.screen.width);
    this.sprite.position.y = this.y = Math.floor(Math.random() * app.screen.height);

    app.stage.addChild(this.sprite);
    // ws.onopen = () => {

    // };

    ws.onopen = () => {
      console.log(
        "%c WebSocket Connection Made ",
        "background: #111; color: #bada55; font-size: 30px; border-radius: 5px"
      );

      ws.send(
        JSON.stringify({
          type: TYPES.CLIENT.JOIN_PUBLIC_ROOM,
          username: this.username,
          game: {
            x: this.x,
            y: this.y,
          },
        })
      );

      ws.send(
        JSON.stringify({
          type: TYPES.ROOM.GET_ALL_CLIENTS,
        })
      );
    };
  }
}

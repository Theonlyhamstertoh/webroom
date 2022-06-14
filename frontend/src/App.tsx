import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./sockets/websocket";
import { AnimatedSprite, Application, Sprite, Texture } from "pixi.js";
import ws from "./sockets/websocket";
import { TYPES } from "../../backend/src/TOPICS";
import Player from "./class/Player";
import ClientWebSocket from "./sockets/websocket";

export let app: Application;
function App() {
  // const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // const conty: Container = new Container();

    app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x6495ed,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    document.body.appendChild(app.view);

    const player: Sprite = new Player(app, "weibo").sprite;

    return () => {
      app.destroy(true, true);
    };
  }, []);

  // const [movement, setMovement] = useState({
  //   up: false,
  //   down: false,
  //   left: false,
  //   right: false,
  // });

  return <div className="App">{/* <canvas ref={canvas} id="pixi-canvas"></canvas> */}</div>;
}

const keys = {
  keyW: "up",
  KeyS: "down",
  KeyA: "left",
  KeyD: "right",
};

export default App;

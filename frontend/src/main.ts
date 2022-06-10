import "./style.css";
import * as PIXI from "pixi.js";
import "./websocket";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
});
document.body.appendChild(app.view);

// const emoji = new Emoji(app.view.width, app.view.height, 50, 100);
// app.ticker.add((deltaTime) => {
//   emoji.update(ws, deltaTime);
// });

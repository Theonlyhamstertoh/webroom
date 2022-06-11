import { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import "./sockets/websocket";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    document.body.appendChild(app.view);
  }, []);

  return <div className="App"></div>;
}

export default App;

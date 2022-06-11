import UWS from "uWebSockets.js";
import getRoomTopic from "./functions/getRoomTopic.js";
import messageActions from "./message.js";
import { TOPICS } from "./TOPICS.js";
import "./class/Room.js";
/**
 *
 * VARIABLES
 *
 */
const app: UWS.TemplatedApp = UWS.App({});

/**
 *
 * SERVER
 *
 */
app.ws("/*", {
  idleTimeout: 0,
  open: (ws) => {
    console.log(`-------------------`);
    console.log(`WEBSOCKET CONNECTED`);
  },
  message: (ws, message) => messageActions(ws, message, app),
});

const PORT: number = parseInt(process.env.PORT as string) || 3001;
app.listen("0.0.0.0", PORT, (listenSocket: UWS.us_listen_socket) => {
  listenSocket
    ? console.log(`Listening to port: ${PORT}`)
    : console.log("Failed to listen");
});

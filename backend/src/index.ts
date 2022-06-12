import UWS from "uWebSockets.js";
import getRoomTopic from "./functions/getRoomTopic.js";
import messageActions, { joinLeaveRoomHandler, publishClientData } from "./message.js";
import { TOPICS, TYPES } from "./TOPICS.js";
import "./class/Room.js";
import { nanoid } from "nanoid";
import { house, serverLobby } from "./test.js";
import Room from "./class/Room.js";
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
    ws.id = nanoid();
    // serverLobby.addClient(ws.id, "cool guy");
    serverLobby.totalClientsInServer++;
  },

  message: (ws, message) => messageActions(ws, message, app),
  close: (ws, message) => {
    serverLobby.totalClientsInServer--;

    ws.roomId && joinLeaveRoomHandler(ws, TYPES.CLIENT.LEAVE_ROOM, app, true);
  },
});

const PORT: number = parseInt(process.env.PORT as string) || 3001;
app.listen("0.0.0.0", PORT, (listenSocket: UWS.us_listen_socket) => {
  listenSocket ? console.log(`Listening to port: ${PORT}`) : console.log("Failed to listen");
});

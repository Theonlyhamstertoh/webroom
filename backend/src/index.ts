import UWS from "uWebSockets.js";
import getRoomTopic from "./functions/getRoomTopic.js";
import messageActions, { publishClientData } from "./message.js";
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

    // if client disconnected while in a room, remove client from room
    if (ws.roomId) {
      const room: Room | Error = house.getRoom(ws.roomId!);
      room.removeClient(ws.id);
      publishClientData(ws, room, TYPES.ROOM.REMOVE_CLIENT, app);
      console.log(`${ws.username} has disconnected. Room count: ${room.size}`);
    }
  },
});

const PORT: number = parseInt(process.env.PORT as string) || 3001;
app.listen("0.0.0.0", PORT, (listenSocket: UWS.us_listen_socket) => {
  listenSocket ? console.log(`Listening to port: ${PORT}`) : console.log("Failed to listen");
});

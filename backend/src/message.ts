import UWS from "uWebSockets.js";
import { TYPES, TOPICS, clientData } from "./TOPICS.js";
const decoder = new TextDecoder("utf-8");

export default function message(ws: UWS.WebSocket, message: ArrayBuffer) {
  const client_data = JSON.parse(decoder.decode(message));

  console.log(client_data);
  switch (client_data.topic) {
    case TOPICS.CLIENT_CHANNEL:
      client_actions(ws, client_data);
      break;
  }
}

function client_actions(ws: UWS.WebSocket, client_data: any) {
  switch (client_data.type) {
    case TYPES.CLIENT.CONNECTED:
      ws.send("client conencted");
      break;
  }
}

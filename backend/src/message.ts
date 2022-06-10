import UWS from "uWebSockets.js";
import { RoomMap } from "./class/RoomMap.js";
import { TYPES, TOPICS, clientData } from "./TOPICS.js";
const decoder = new TextDecoder("utf-8");

const roomMap = new RoomMap();
roomMap.createRoom();
roomMap.createRoom();
roomMap.createRoom();
roomMap.createRoom();
roomMap.createRoom();
roomMap.createRoom();
roomMap.createRoom();
export default function message(ws: UWS.WebSocket, message: ArrayBuffer) {
  const client_data = JSON.parse(decoder.decode(message));

  console.log(client_data);
  switch (client_data.topic) {
    case TOPICS.CLIENT_CHANNEL:
      client_actions(ws, client_data);
      break;
    case TOPICS.ROOM_CHANNEL:
      room_actions(ws, client_data, roomMap);
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
function room_actions(ws: UWS.WebSocket, client_data: any, roomMap: RoomMap) {
  switch (client_data.type) {
    case TYPES.ROOM.CREATE_ROOM:
      const newRoom = roomMap.createRoom();
      break;
    case TYPES.ROOM.GET_ALL_ROOMS:
      // ws.send(JSON.stringify(Object.fromEntries(roomMap.getAllRooms())));
      ws.send(JSON.stringify(roomMap.getAllRooms()));
      console.log(roomMap.getAllRooms());
      break;
    case TYPES.ROOM.REMOVE_ROOM:
      roomMap.removeRoom(client_data.id);
      break;
    case TYPES.ROOM.JOIN_ROOM:
      // send the clicked room id
      roomMap.getRoom(client_data.id).addClient(ws.id, ws);
  }
}

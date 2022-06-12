import { nanoid } from "nanoid";
import UWS from "uWebSockets.js";
import Room from "./class/Room.js";
import House from "./class/House.js";
import getRoomTopic from "./functions/getRoomTopic.js";
import { TYPES, TOPICS } from "./TOPICS.js";
import { ServerData } from "./types/types.js";

const decoder = new TextDecoder("utf-8");
/**
 * Testing
 */
import { house } from "./test.js";
import { appendFile } from "fs";

export default function messageActions(
  ws: UWS.WebSocket,
  message: ArrayBuffer,
  app: UWS.TemplatedApp
) {
  const client_data: ServerData = JSON.parse(decoder.decode(message));

  console.log(client_data);
  switch (client_data.topic) {
    case TOPICS.CLIENT_CHANNEL:
      client_actions(ws, client_data, house, app);
      break;
    case TOPICS.ROOM_CHANNEL:
      room_actions(ws, client_data, house, app);
      break;
    case TOPICS.GAME_CHANNEL:
  }
}

/**
 *
 * @todo send user data when client joins to everyone
 *
 * @param ws
 * @param client_data
 * @param app
 */
function client_actions(
  ws: UWS.WebSocket,
  client_data: any,
  house: House,
  app: UWS.TemplatedApp
) {
  switch (client_data.type) {
    case TYPES.CLIENT.JOIN_PUBLIC_ROOM:

    case TYPES.CLIENT.LEAVE_PUBLIC_ROOM:
      break;
  }
}
function room_actions(
  ws: UWS.WebSocket,
  client_data: any,
  house: House,
  app: UWS.TemplatedApp
) {
  // console.log(roomMap.getAllRooms());
  switch (client_data.type) {
    case TYPES.ROOM.CREATE_ROOM:
      // const newRoom = roomMap.createRoom();
      break;
    case TYPES.ROOM.GET_ALL_ROOMS:
      // send all the rooms and clients over

      ws.send(
        JSON.stringify({
          topic: TOPICS.ROOM_CHANNEL,
          type: TYPES.ROOM.GET_ALL_ROOMS,
          house: house.getAllRooms(),
        })
      );
      break;
    case TYPES.ROOM.REMOVE_ROOM:
      house.removeRoom(client_data.id);
      break;
  }
}

// case TYPES.ROOM.ADD_CLIENT_TO_LIST:
//   // add to every client's list and update old map
//   room = roomMap.getRoom(client_data.roomId);
//   if (room instanceof Room) {
//     // WE ARE THE SERVER. HE IS ALREADY IN THE ARRAY
//     // WE JUST NEED TO SEND HIS DATA TO EVERYONE AND UPDATE ROOM LISTING
//     // room.addClient(ws.id, ws);
//   }
//   break;
// case TYPES.ROOM.REMOVE_CLIENT_FROM_LIST:
//   room = roomMap.getRoom(client_data.roomId);
//   if (room instanceof Room) {
//     room.removeClient(ws.id);
//   }
//   break; *

// room = roomMap.getRoom(client_data.roomId);
// if (room instanceof Room) {
//   console.log(room.getAllClients());
//   data = {
//     topic: TOPICS.ROOM_CHANNEL,
//     type: TYPES.ROOM.REMOVE_CLIENT_FROM_LIST,
//     roomId: client_data.roomId,
//     client: ws,
//   };
//   app.publish(
//     getRoomTopic("1234", TOPICS.ROOM_CHANNEL),
//     JSON.stringify(data)
//   );
//   // ws.send(JSON.stringify(data)); cvfgb bfgb
//   room.removeClient(ws.id);
//   ws.unsubscribe(getRoomTopic(room.id, TOPICS.ROOM_CHANNEL));
//   ws.unsubscribe(getRoomTopic(room.id, TOPICS.GAME_CHANNEL));
// }

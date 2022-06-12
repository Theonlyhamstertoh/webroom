import { nanoid } from "nanoid";
import UWS from "uWebSockets.js";
import Room from "./class/Room.js";
import House from "./class/House.js";
import getRoomTopic from "./functions/getRoomTopic.js";
import { TYPES, TOPICS, CHANNELS } from "./TOPICS.js";
import { ServerData } from "./types/types.js";

const decoder = new TextDecoder("utf-8");
/**
 * Testing
 */
import { house, serverLobby } from "./test.js";
import { appendFile } from "fs";

export default function messageActions(
  ws: UWS.WebSocket,
  message: ArrayBuffer,
  app: UWS.TemplatedApp
) {
  const client_data: ServerData = JSON.parse(decoder.decode(message));

  console.log(client_data);
  console.log(serverLobby.totalClientsInServer);
  client_actions(ws, client_data, house, app);
  room_actions(ws, client_data, house, app);
  // switch (client_data.channel) {
  //   case CHANNELS.CLIENT_TYPE:
  //     break;
  //   case CHANNELS.ROOM_TYPE:
  //     break;
  //   case CHANNELS.GAME_TYPE:
  // }
}

/**
 *
 * @todo send user data when client joins to everyone
 *
 * @param ws
 * @param client_data
 * @param app
 */
function client_actions(ws: UWS.WebSocket, client_data: any, house: House, app: UWS.TemplatedApp) {
  switch (client_data.type) {
    case TYPES.CLIENT.JOIN_PUBLIC_ROOM: {
      // create OR update username
      ws.username = client_data.username as string;
      for (const [_, room] of house.roomMap) {
        if (room.isPlaying) continue;
        if (room.clientMap.size >= room.maxSize) continue;
        // push client to the first empty room available
        // and break out of loop
        room.addClient(ws.id, ws);
        ws.roomId = room.id as string;

        // subscribe to room channel
        ws.subscribe(room.id);
        // add app to optional third parameter to have it send to everyone
        publishClientData(ws, room, TYPES.ROOM.ADD_CLIENT, app);
        break;
      }

      break;
    }
    case TYPES.CLIENT.JOIN_PRIVATE_ROOM: {
      // to join a private room, you need a code
      ws.roomId = client_data.roomId as string;
      ws.username = client_data.username as string;
      joinLeaveRoomHandler(ws, TYPES.CLIENT.JOIN_PRIVATE_ROOM, app);
      break;
    }
    case TYPES.CLIENT.LEAVE_ROOM:
      joinLeaveRoomHandler(ws, TYPES.CLIENT.LEAVE_ROOM);
      break;
  }
}
function room_actions(ws: UWS.WebSocket, client_data: any, house: House, app: UWS.TemplatedApp) {
  // console.log(roomMap.getAllRooms());
  switch (client_data.type) {
    case TYPES.ROOM.CREATE_ROOM:
      // const newRoom = roomMap.createRoom();
      break;
    case TYPES.ROOM.GET_ALL_ROOMS:
      // send all the rooms and clients over

      ws.send(
        JSON.stringify({
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

export function publishClientData(
  ws: UWS.WebSocket,
  room: Room,
  type: string,
  app?: UWS.TemplatedApp
): void {
  console.log(app || ws);
  (app || ws).publish(
    room.id,
    JSON.stringify({
      type,
      clientId: ws.id,
      clientUsername: ws.username,
      roomId: room.id,
      roomSize: room.getAllClients(),
      rooms: house.getAllRooms(),
    })
  );
}

export function joinLeaveRoomHandler(
  ws: UWS.WebSocket,
  type: string,
  app?: UWS.TemplatedApp,
  isSocketClosed?: boolean
) {
  const room: Room | Error = house.getRoom(ws.roomId!);
  if (room instanceof Room) {
    if (type === TYPES.CLIENT.JOIN_PRIVATE_ROOM) {
      room.addClient(ws.id, ws);
      ws.subscribe(room.id);
      publishClientData(ws, room, TYPES.ROOM.ADD_CLIENT, app);
    } else if (type === TYPES.CLIENT.LEAVE_ROOM) {
      room.removeClient(ws.id);
      ws.roomId = undefined;
      if (isSocketClosed) {
        return publishClientData(ws, room, TYPES.ROOM.REMOVE_CLIENT, app);
      } else {
        ws.unsubscribe(room.id);
        return publishClientData(ws, room, TYPES.ROOM.REMOVE_CLIENT);
      }
    }
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

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
import Player from "./class/Player.js";
import { Server } from "http";

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
  game_actions(ws, client_data, house, app);
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
function client_actions(
  ws: UWS.WebSocket,
  client_data: ServerData,
  house: House,
  app: UWS.TemplatedApp
) {
  switch (client_data.type) {
    case TYPES.CLIENT.JOIN_PUBLIC_ROOM: {
      // create OR update username
      ws.username = client_data.username as string;
      ws.player = new Player(client_data);
      for (const [_, room] of house.roomMap) {
        if (room.isPlaying) continue;
        if (room.clientMap.size >= room.maxSize) continue;

        ws.send(
          JSON.stringify({
            type: TYPES.ROOM.GET_ALL_CLIENTS,
            clients: room.getAllClients(),
          })
        );

        // push client to the first empty room available
        // and break out of loop
        room.addClient(ws.id, ws);
        ws.roomId = room.id as string;

        // subscribe to room channel
        ws.subscribe(room.id);
        // add app to optional third parameter to have it send to everyone
        publishClientData(ws, room, TYPES.ROOM.ADD_CLIENT);
        console.log(`${ws.username} has connected. Room count: ${room.size}`);
        break;
      }
      break;
    }
    case TYPES.CLIENT.JOIN_PRIVATE_ROOM: {
      // to join a private room, you need a code
      ws.roomId = client_data.roomId as string;
      ws.username = client_data.username as string;
      const room: Room | Error = house.getRoom(ws.roomId!);

      room.addClient(ws.id, ws);
      ws.subscribe(room.id);
      publishClientData(ws, room, TYPES.ROOM.ADD_CLIENT, app);
      break;
    }
    case TYPES.CLIENT.LEAVE_ROOM:
      const room: Room | Error = house.getRoom(ws.roomId!);
      room.removeClient(ws.id);
      publishClientData(ws, room, TYPES.ROOM.REMOVE_CLIENT);
      ws.unsubscribe(room.id);
      ws.roomId = undefined;
      break;
  }
}
function room_actions(ws: UWS.WebSocket, client_data: any, house: House, app: UWS.TemplatedApp) {
  // console.log(roomMap.getAllRooms());
  switch (client_data.type) {
    case TYPES.ROOM.CREATE_ROOM:
      // const newRoom = roomMap.createRoom();
      break;
    case TYPES.ROOM.GET_ALL_CLIENTS:
      break;
    case TYPES.ROOM.REMOVE_ROOM:
      house.removeRoom(client_data.id);
      break;
  }
}

function game_actions(ws: UWS.WebSocket, client_data: any, house: House, app: UWS.TemplatedApp) {
  switch (client_data.type) {
    case TYPES.GAME.UPDATE:
  }
}
export function publishClientData(
  ws: UWS.WebSocket,
  room: Room,
  type: string,
  app?: UWS.TemplatedApp
): void {
  (app || ws).publish(
    room.id,
    JSON.stringify({
      type,
      clientId: ws.id,
      username: ws.username,
      roomId: room.id,
    })
  );
}

import { nanoid } from "nanoid";
import UWS from "uWebSockets.js";
import Room from "./class/Room.js";
import { RoomMap } from "./class/RoomMap.js";
import getRoomTopic from "./functions/getRoomTopic.js";
import { TYPES, TOPICS } from "./TOPICS.js";
import { ServerData } from "./types/types.js";

const decoder = new TextDecoder("utf-8");
/**
 * Testing
 */
import { roomMap } from "./test.js";
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
      client_actions(ws, client_data, app);
      break;
    case TOPICS.ROOM_CHANNEL:
      room_actions(ws, client_data, roomMap, app);
      break;
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
  app: UWS.TemplatedApp
) {
  let room: Room | Error;
  let data: ServerData;

  switch (client_data.type) {
    case TYPES.CLIENT.CONNECTED:
      ws.send("client conencted");
      break;
    case TYPES.CLIENT.JOIN_ROOM:
      ws.id = nanoid();

      // add client to the room list
      // error checking will be done in the function
      room = roomMap.getRoom(client_data.roomId);
      if (room instanceof Room) {
        room.addClient(ws.id, ws);
        ws.subscribe(getRoomTopic(room.id, TOPICS.ROOM_CHANNEL));
        ws.subscribe(getRoomTopic(room.id, TOPICS.GAME_CHANNEL));

        data = {
          topic: TOPICS.ROOM_CHANNEL,
          type: TYPES.ROOM.ADD_CLIENT_TO_LIST,
          client: ws,
          roomId: client_data.roomId,
        };

        // send to every user that client has joined
        app.publish(
          getRoomTopic(room.id, TOPICS.ROOM_CHANNEL),
          JSON.stringify(data)
        );
      }
      break;
    case TYPES.CLIENT.LEAVE_ROOM:
      room = roomMap.getRoom(client_data.roomId);
      if (room instanceof Room) {
        data = {
          topic: TOPICS.ROOM_CHANNEL,
          type: TYPES.ROOM.REMOVE_CLIENT_FROM_LIST,
          roomId: client_data.roomId,
          client: ws,
        };
        app.publish(
          getRoomTopic(room.id, TOPICS.ROOM_CHANNEL),
          JSON.stringify(data)
        );
        // ws.send(JSON.stringify(data));
        room.removeClient(ws.id);
        ws.unsubscribe(getRoomTopic(room.id, TOPICS.ROOM_CHANNEL));
        ws.unsubscribe(getRoomTopic(room.id, TOPICS.GAME_CHANNEL));
      }
      break;
  }
}
function room_actions(
  ws: UWS.WebSocket,
  client_data: any,
  roomMap: RoomMap,
  app: UWS.TemplatedApp
) {
  // console.log(roomMap.getAllRooms());
  switch (client_data.type) {
    case TYPES.ROOM.CREATE_ROOM:
      const newRoom = roomMap.createRoom();

      break;
    case TYPES.ROOM.GET_ALL_ROOMS:
      // send all the rooms and clients over
      ws.send(
        JSON.stringify({
          topic: TOPICS.ROOM_CHANNEL,
          type: TYPES.ROOM.GET_ALL_ROOMS,
          roomMap: roomMap.getAllRooms(),
        })
      );

      break;
    case TYPES.ROOM.REMOVE_ROOM:
      roomMap.removeRoom(client_data.id);
      break;
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
    //   break;
  }
}

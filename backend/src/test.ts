import ServerLobby from "./class/ServerLobby.js";
import House from "./class/House.js";
import { MAX_ROOM_SIZE } from "./TOPICS.js";
export const house: House = new House();
export const serverLobby: ServerLobby = new ServerLobby();
for (let i = 0; i < 20; i++) {
  const room = house.createRoom("public", MAX_ROOM_SIZE);
  // room.admin_only_add_fake_client(i + 1 + "-girl");
  // room.admin_only_add_fake_client(i + 1 + "-boy");
}

/**
 * @todo seperate public and private room
 * @todo create 1 public room. If fills up, create a second
 * @todo remove client from room if he disconnects instead of leaving
 * @todo on connecting
 * set basic data on user
 *
 *
 */
//

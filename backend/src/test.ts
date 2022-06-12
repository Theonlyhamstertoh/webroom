import LobbyMap from "./class/LobbyMap.js";
import House from "./class/House.js";
export const house = new House();
export const lobbyMap: LobbyMap = new LobbyMap();
for (let i = 0; i < 10; i++) {
  const room = house.createRoom("public");
  room.admin_only_set_id(i + 1 + "-room");
  room.admin_only_add_fake_client(i + 1 + "-girl");
  room.admin_only_add_fake_client(i + 1 + "-boy");
}

console.log(house.roomMap);

/**
 * @todo seperate public and private room
 * @todo create 1 public room. If fills up, create a second
 *
 * @todo allow user to get all room, join, leave, and update it
 * client gets all room
 * client joins a room
 * client subscribes to topics
 * client
 *
 * @todo on connecting
 * set basic data on user
 *
 *
 */
//

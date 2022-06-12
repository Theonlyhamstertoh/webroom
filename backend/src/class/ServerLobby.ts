import { nanoid } from "nanoid";
import { house } from "../test.js";
import { MAX_ROOM_SIZE, MIN_ROOM_SIZE } from "../TOPICS.js";

export default class ServerLobby {
  readonly id = nanoid();
  totalClientsInServer: number = 0;
  minSize: number = 5;
  getTotalRoomsOpened() {
    return house.size;
  }
}

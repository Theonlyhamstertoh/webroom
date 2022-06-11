import { RoomMap } from "./class/RoomMap.js";
export const roomMap = new RoomMap();

for (let i = 0; i < 10; i++) {
  roomMap.createRoom();
}

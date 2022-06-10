import { nanoid } from "nanoid";
import Room from "./Room.js";

export class RoomMap {
  #roomMap = new Map();
  #id = nanoid();

  createRoom() {
    const newRoom = new Room();
    this.#roomMap.set(newRoom.id, newRoom);
    return newRoom;
  }

  removeRoom(id: string) {
    this.#roomMap.delete(id);
  }

  removeAllRooms() {
    this.#roomMap.clear();
  }

  getRoom(id: string) {
    if (this.#roomMap.has(id)) {
      return this.#roomMap.get(id);
    } else {
      return new Error("NO ROOM FOUND");
    }
  }

  getAllRooms() {
    const array: any[] = [];
    this.#roomMap.forEach((value, key) => {
      array.push({
        id: value.id,
        code: value.code,
      });
    });
    return array;
  }

  get size() {
    return this.#roomMap.size;
  }
}

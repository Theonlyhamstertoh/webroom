import { nanoid } from "nanoid";
import { TYPES } from "../TOPICS.js";
import Room from "./Room.js";

export class RoomMap {
  #roomMap: Map<string, Room> = new Map();
  #id = nanoid();

  createRoom() {
    const newRoom: Room = new Room();
    this.#roomMap.set(newRoom.id, newRoom);
    return newRoom;
  }

  removeRoom(id: string) {
    this.#roomMap.delete(id);
  }

  removeAllRooms() {
    this.#roomMap.clear();
  }

  getRoom(id: string): Room | Error {
    if (this.#roomMap.has(id)) {
      return this.#roomMap.get(id)!;
    } else {
      return new Error("NO ROOM FOUND");
    }
  }

  getAllRooms() {
    return Array.from(this.#roomMap, ([_, room]) => ({
      ...room,
      clients: room.getAllClients(),
    }));
  }

  get size() {
    return this.#roomMap.size;
  }

  get id() {
    return this.#id;
  }
}

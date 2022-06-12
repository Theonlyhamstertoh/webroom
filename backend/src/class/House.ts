import { nanoid } from "nanoid";
import { TYPES } from "../TOPICS.js";
import Room from "./Room.js";

export default class House {
  roomMap: Map<string, Room> = new Map();
  #id = nanoid();

  createRoom(type: string) {
    const newRoom: Room = new Room(type);
    this.roomMap.set(newRoom.id, newRoom);
    return newRoom;
  }

  removeRoom(id: string) {
    this.roomMap.delete(id);
  }

  removeAllRooms() {
    this.roomMap.clear();
  }

  getRoom(id: string): Room | Error {
    if (this.roomMap.has(id)) {
      return this.roomMap.get(id)!;
    } else {
      return new Error("NO ROOM FOUND");
    }
  }

  getAllRooms() {
    return Array.from(this.roomMap, ([_, room]) => ({
      ...room,
      clients: room.getAllClients(),
    }));
  }

  getRoomMap() {
    return this.roomMap;
  }
  get size() {
    return this.roomMap.size;
  }

  get id() {
    return this.#id;
  }
}

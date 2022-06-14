import { nanoid } from "nanoid";
import { TYPES } from "../TOPICS.js";
import Room from "./Room.js";

export default class House {
  roomMap: Map<string, Room> = new Map();
  #id = nanoid();

  createRoom(type: string, maxSize: number) {
    const newRoom: Room = new Room(type, maxSize);
    this.roomMap.set(newRoom.id, newRoom);
    return newRoom;
  }

  removeRoom(id: string) {
    this.roomMap.delete(id);
  }

  removeAllRooms() {
    this.roomMap.clear();
  }

  getRoom(id: string): Room {
    // if (this.roomMap.has(id)) {
    return this.roomMap.get(id)!;
    // } else {
    // return new Error("NO ROOM FOUND");
    // }
  }

  getAllRooms() {
    return Array.from(this.roomMap, ([_, room]) => ({
      ...room,
      clients: room.getAllClients(),
    }));
  }

  getAllPublicRooms(): number {
    let size = 0;
    for (const [_, room] of this.roomMap) {
      if (room.type === "public") {
        size++;
      }
    }
    return size;
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

import { randomBytes } from "crypto";
import { customAlphabet, nanoid } from "nanoid";
import UWS from "uWebSockets.js";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

// import { TYPES, TOPICS, clientData } from "../TOPICS";
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
    return this.#roomMap;
  }
}

export default class Room {
  #id = nanoid();
  #code = customAlphabet(characters, 6)();
  #clientMap = new Map();

  addClient(id: string, ws: string) {
    this.#clientMap.set(id, ws);
  }

  removeClient(id: string) {
    this.#clientMap.delete(id);
  }

  getCient(id: string) {
    if (this.#clientMap.has(id)) {
      return this.#clientMap.get(id);
    } else {
      return console.error("ERROR: NO CLIENT FOUND");
    }
  }

  getAllClients() {
    return this.#clientMap;
  }

  removeAllClients() {
    this.#clientMap.clear();
  }

  get size() {
    return this.#clientMap.size;
  }

  get code() {
    return this.#code;
  }

  get id() {
    return this.#id;
  }
}

const roomMap = new RoomMap();
for (let i = 0; i < 10; i++) {
  const room = roomMap.createRoom();
  room.addClient(nanoid(5), "some guy");
  room.addClient(nanoid(5), "some guy");
  room.addClient(nanoid(5), "some guy");
}

// console.log(roomMap.getAllRooms());
roomMap.getAllRooms().forEach((value, key) => {
  // console.log(`${key}  :   ${value}`);
});
const room1 = roomMap.getAllRooms().entries().next().value[0];
console.log(roomMap.getAllRooms());
roomMap.getAllRooms().delete(room1);
console.log(roomMap.getAllRooms());

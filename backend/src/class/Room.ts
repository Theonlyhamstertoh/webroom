import { randomBytes } from "crypto";
import { customAlphabet, nanoid } from "nanoid";
import UWS from "uWebSockets.js";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

export default class Room {
  #id = nanoid();
  #code = customAlphabet(characters, 6)();
  #clientMap = new Map();

  addClient(id: string, ws: UWS.WebSocket) {
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

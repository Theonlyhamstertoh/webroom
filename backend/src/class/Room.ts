import { customAlphabet, nanoid } from "nanoid";
import UWS from "uWebSockets.js";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

export default class Room {
  // readonly id = nanoid();
  readonly id = "1234";
  readonly code = customAlphabet(characters, 6)();
  #clientMap: Map<string, UWS.WebSocket> = new Map();

  addClient(id: string, ws: UWS.WebSocket): void {
    this.#clientMap.set(id, ws);
  }

  removeClient(id: string): void {
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
    return Array.from(this.#clientMap, ([_, ws]) => ws);
  }

  removeAllClients(): void {
    this.#clientMap.clear();
  }

  get size() {
    return this.#clientMap.size;
  }
}

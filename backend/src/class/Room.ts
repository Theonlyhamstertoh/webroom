import { customAlphabet, nanoid } from "nanoid";
import UWS from "uWebSockets.js";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

export default class Room {
  readonly id: string = nanoid();
  readonly code = customAlphabet(characters, 6)();
  // clientMap: Map<string, UWS.WebSocket> = new Map();
  clientMap: Map<string, any> = new Map();
  isPlaying: boolean = false;
  isOver: boolean = false;
  maxSize: number;
  minSize: number;
  readonly type: string;

  constructor(roomType: string, maxSize: number) {
    this.type = roomType;
    this.maxSize = maxSize;
  }
  addClient(id: string, ws: UWS.WebSocket): void {
    this.clientMap.set(id, ws);
  }

  removeClient(id: string): void {
    this.clientMap.delete(id);
  }

  getCient(id: string) {
    if (this.clientMap.has(id)) {
      return this.clientMap.get(id);
    } else {
      return console.error("ERROR: NO CLIENT FOUND");
    }
  }

  getAllClients() {
    return Array.from(this.clientMap, ([_, ws]) => ({
      id: ws.id,
      username: ws.username,
    }));
  }

  removeAllClients(): void {
    this.clientMap.clear();
  }

  get size() {
    return this.clientMap.size;
  }

  getClientMap() {
    return this.clientMap;
  }

  admin_only_add_fake_client(id: string) {
    this.clientMap.set(id, nanoid());
  }
}

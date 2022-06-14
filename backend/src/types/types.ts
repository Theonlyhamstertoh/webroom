import Room from "src/class/Room.js";
import UWS from "uWebSockets.js";

export interface client_socket {}

export interface ServerData {
  channel: string;
  type: string;
  roomId?: string;
  roomCode?: string;
  // client?: ClientData;
  clientId?: string;
  username?: string;
  game?: GameData;
}

export interface GameData {
  x: number;
  y: number;
}

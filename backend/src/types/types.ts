import Room from "src/class/Room.js";
import UWS from "uWebSockets.js";

export interface client_socket {}

export interface ServerData {
  topic: string;
  type: string;
  roomId?: string;
  roomMap?: [];
  roomCode?: string;
  client?: UWS.WebSocket;
}

export interface ClientData {
  username: string;
  id: string;
}

export interface gameData {
  x: number;
  y: number;
}

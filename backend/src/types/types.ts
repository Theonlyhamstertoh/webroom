import Room from "src/class/Room.js";

export interface client_socket {}

export interface clientData {
  topic: string;
  type: string;
  roomId?: string;
  roomMap?: [];
  roomCode?: string;
  username?: string;
}

export interface gameData {
  x: number;
  y: number;
}

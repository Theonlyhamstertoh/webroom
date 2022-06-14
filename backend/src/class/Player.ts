import { ServerData } from "src/types/types";

export default class Player {
  x: number;
  y: number;
  constructor(client_data: any) {
    this.x = client_data.game.x;
    this.y = client_data.game.y;
  }
}

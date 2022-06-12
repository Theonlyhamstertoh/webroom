import { nanoid } from "nanoid";

export default class ServerLobby {
  readonly id = nanoid();
  #lobbyMap: Map<string, any> = new Map();
  totalClientsInServer: number = 0;
  addClient(id: string, ws: any): void {
    this.#lobbyMap.set(id, ws);
  }

  removeClient(id: string): void {
    this.#lobbyMap.delete(id);
  }

  getCient(id: string) {
    if (this.#lobbyMap.has(id)) {
      return this.#lobbyMap.get(id);
    } else {
      return console.error("ERROR: NO CLIENT FOUND");
    }
  }
  getAllClients() {
    return Array.from(this.#lobbyMap, ([_, ws]) => ws);
  }

  removeAllClients(): void {
    this.#lobbyMap.clear();
  }

  get size() {
    return this.#lobbyMap.size;
  }

  getLobbyMap() {
    return this.#lobbyMap;
  }
}

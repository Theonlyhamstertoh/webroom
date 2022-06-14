import { CHANNELS, TOPICS, TYPES } from "../../../backend/src/TOPICS";
import { app } from "../App";
import Player from "../class/Player";

export const ws = new WebSocket("ws://localhost:3001");

const clients: Map<string, object> = new Map();
ws.onmessage = (event) => {
  console.log(JSON.parse(event.data));
  const data = JSON.parse(event.data);
  switch (data.type) {
    case TYPES.ROOM.GET_ALL_CLIENTS:
      data.clients.forEach((client) => {
        clients.set(client.id, new Player(app, client.username));
      });
      break;
    case TYPES.ROOM.REMOVE_CLIENT:
      clients.delete(data.clientId);
      break;
    case TYPES.ROOM.ADD_CLIENT:
      clients.set(data.clientId, new Player(app, "wybo"));
      break;
    case TYPES.GAME.UPDATE:
    // const player = clients.get(data.clientId)

    // break;
  }
  console.log(clients);
};
// ws.onopen = () => {
//   console.log(
//     "%c WebSocket Connection Made ",
//     "background: #111; color: #bada55; font-size: 30px; border-radius: 5px"
//   );

export default ws;

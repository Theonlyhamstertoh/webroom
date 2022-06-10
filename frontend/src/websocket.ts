import { clientData, CLIENT_TYPES, TOPICS, TYPES } from "./TOPICS";

const ws = new WebSocket("ws://localhost:3001");

ws.onmessage = (event) => {
  console.log(JSON.parse(event.data));
};
ws.onopen = () => {
  console.log(
    "%c WebSocket Connection Made ",
    "background: #111; color: #bada55; font-size: 30px; border-radius: 5px"
  );

  const data: any = {
    // in future, it would include room code
    topic: TOPICS.ROOM_CHANNEL,
    type: TYPES.ROOM.GET_ALL_ROOMS,
  };

  ws.send(JSON.stringify(data));
};

export default ws;

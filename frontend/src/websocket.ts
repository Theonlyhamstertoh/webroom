import { clientData, CLIENT_TYPES, TOPICS, TYPES } from "./TOPICS";

const ws = new WebSocket("ws://localhost:3001");

ws.onmessage = (event) => {
  console.log(event.data);
};
ws.onopen = () => {
  console.log(
    "%c WebSocket Connection Made ",
    "background: #111; color: #bada55; font-size: 30px; border-radius: 5px"
  );

  const data: any = {
    // in future, it would include room code
    topic: TOPICS.CLIENT_CHANNEL,
    type: TYPES.CLIENT.CONNECTED,
    roomCode: 1234,
  };

  ws.send(JSON.stringify(data));
};

export default ws;

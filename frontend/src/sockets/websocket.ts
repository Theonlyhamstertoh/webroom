import { clientData, TOPICS, TYPES } from "../../../backend/src/TOPICS";

const ws = new WebSocket("ws://localhost:3001");

const rooms: any[] = [];
ws.onmessage = (event) => {
  console.log(JSON.parse(event.data));
  const data = JSON.parse(event.data);

  switch (data.type) {
    case TYPES.ROOM.GET_ALL_ROOMS:
      rooms.push(...data.roomMap);
  }
};
ws.onopen = () => {
  console.log(
    "%c WebSocket Connection Made ",
    "background: #111; color: #bada55; font-size: 30px; border-radius: 5px"
  );

  const data: any = {
    // in future, it would include room code
    topic: TOPICS.ROOM_CHANNEL,
    type: TYPES.ROOM.CREATE_ROOM,
  };

  ws.send(JSON.stringify(data));
  ws.send(
    JSON.stringify({
      topic: TOPICS.ROOM_CHANNEL,
      type: TYPES.CLIENT.JOINED_ROOM,
    })
  );
};

export default ws;

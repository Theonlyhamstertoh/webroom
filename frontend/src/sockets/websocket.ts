import { clientData, TOPICS, TYPES } from "../../../backend/src/TOPICS";

const ws = new WebSocket("ws://localhost:3001");

const rooms: any[] = [];
ws.onmessage = (event) => {
  console.log(JSON.parse(event.data));
  const data = JSON.parse(event.data);
  switch (data.type) {
    case TYPES.ROOM.GET_ALL_ROOMS:
      rooms.push(...data.roomMap);
      break;
    case TYPES.ROOM.REMOVE_CLIENT_FROM_LIST:
      rooms.find((room, index) => {
        if (room.id === data.roomId) {
          room.clients.find((client, i) => {
            client.id === data.client.id && room.clients.splice(index, 1);
          });
        }
      });
      break;
    case TYPES.ROOM.ADD_CLIENT_TO_LIST:
      rooms.find((room) => {
        if (room.id === data.roomId) {
          room.clients.push(data.client);
        }
      });

      // window.setTimeout(() => {

      // }, 2000);
      break;
  }
  // console.log(rooms);
  console.log(rooms);
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
      type: TYPES.ROOM.GET_ALL_ROOMS,
    })
  );

  for (let i = 0; i < 1; i++) {
    ws.send(
      JSON.stringify({
        topic: TOPICS.CLIENT_CHANNEL,
        type: TYPES.CLIENT.JOIN_ROOM,
        roomId: "1234",
      })
    );
  }

  ws.send(
    JSON.stringify({
      topic: TOPICS.CLIENT_CHANNEL,
      type: TYPES.CLIENT.LEAVE_ROOM,
      roomId: "1234",
      client: data.client,
    })
  );
};

export default ws;

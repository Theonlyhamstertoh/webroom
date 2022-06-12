import {
  CHANNELS,
  clientData,
  TOPICS,
  TYPES,
} from "../../../backend/src/TOPICS";

const ws = new WebSocket("ws://localhost:3001");

const rooms: any[] = [];
ws.onmessage = (event) => {
  console.log(JSON.parse(event.data));
  const data = JSON.parse(event.data);
  switch (data.type) {
    case TYPES.ROOM.GET_ALL_ROOMS:
      break;
    case TYPES.ROOM.REMOVE_CLIENT_FROM_LIST:
      break;
    case TYPES.ROOM.ADD_CLIENT_TO_LIST:
      break;
  }
};
ws.onopen = () => {
  console.log(
    "%c WebSocket Connection Made ",
    "background: #111; color: #bada55; font-size: 30px; border-radius: 5px"
  );

  ws.send(
    JSON.stringify({
      type: TYPES.CLIENT.JOIN_PUBLIC_ROOM,
      username: "weibo",
    })
  );

  // window.setTimeout(() => {
  //   ws.send(
  //     JSON.stringify({
  //       type: TYPES.CLIENT.LEAVE_ROOM,
  //       username: "weibo",
  //       roomId: "worship his holy name",
  //     })
  //   );
  // }, 15000);

  // ws.send(
  //   JSON.stringify({
  //     topic: TOPICS.CLIENT_CHANNEL,
  //     type: TYPES.CLIENT.LEAVE_ROOM,
  //     roomId: "1234",
  //     client: data.client,
  //   })
  // );
};

// ws.onmessage = (event) => {
//   console.log(JSON.parse(event.data));
//   const data = JSON.parse(event.data);
//   switch (data.type) {
//     case TYPES.ROOM.GET_ALL_ROOMS:
//       rooms.push(...data.roomMap);
//       break;
//     case TYPES.ROOM.REMOVE_CLIENT_FROM_LIST:
//       rooms.find((room, index) => {
//         if (room.id === data.roomId) {
//           room.clients.find((client, i) => {
//             client.id === data.client.id && room.clients.splice(index, 1);
//           });
//         }
//       });
//       break;
//     case TYPES.ROOM.ADD_CLIENT_TO_LIST:
//       rooms.find((room) => {
//         if (room.id === data.roomId) {
//           room.clients.push(data.client);
//         }
//       });
//       break;
//   }
//   console.log(rooms);
// };

export default ws;

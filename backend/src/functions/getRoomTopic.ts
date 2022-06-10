// Create a topic based on the room id for pub/sub pattern
export default function getRoomTopic(id: string, type: string) {
  return `${id}:::${type}`;
}

"use strict";
exports.__esModule = true;
// Create a topic based on the room id for pub/sub pattern
function getRoomTopic(id, type) {
    return "".concat(id, ":::").concat(type);
}
exports["default"] = getRoomTopic;

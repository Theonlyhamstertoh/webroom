"use strict";
exports.__esModule = true;
var TOPICS_1 = require("./TOPICS");
var decoder = new TextDecoder("utf-8");
function message(ws, message) {
    var client_data = JSON.parse(decoder.decode(message));
    console.log(client_data);
    switch (client_data.topic) {
        case TOPICS_1.TOPICS.CLIENT_CHANNEL:
            client_actions(ws, client_data);
            break;
    }
}
exports["default"] = message;
function client_actions(ws, client_data) {
    switch (client_data.type) {
        case TOPICS_1.TYPES.CLIENT.CONNECTED:
            ws.send("client conencted");
            break;
    }
}

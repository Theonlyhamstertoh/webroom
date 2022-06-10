"use strict";
exports.__esModule = true;
exports.TYPES = exports.TOPICS = void 0;
exports.TOPICS = Object.freeze({
    SERVER_CHANNEL: "SERVER_MESSAGE",
    GAME_CHANNEL: "GAME_CHANNEL",
    CLIENT_CHANNEL: "CLIENT_CHANNEL",
    ROOM_CHANNEL: "ROOM_CHANNEL",
    ERROR: "ERROR"
});
exports.TYPES = Object.freeze({
    GAME: {
        LEADERBOARD: "LEADERBOARD",
        SEND_DATA: "SEND_DATA",
        START: "START",
        OVER: "OVER"
    },
    CLIENT: {
        SELF_CONNECTED: "SELF_CONNECTED",
        CONNECTED: "CONNECTED",
        DISCONNECTED: "DISCONNECTED"
    },
    ROOM: {
        CREATE_ROOM: "CREATE_ROOM",
        CLOSE_ROOM: "CLOSE_ROOM",
        GET_ALL_CLIENTS: "GET_ALL_CLIENTS",
        REMOVE_CLIENT: "REMOVE_CLIENT"
    }
});

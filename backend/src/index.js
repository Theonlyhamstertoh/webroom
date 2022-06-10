"use strict";
exports.__esModule = true;
var uWebSockets_js_1 = require("uWebSockets.js");
var message_1 = require("./message");
require("./class/Room");
/**
 *
 * VARIABLES
 *
 */
var app = uWebSockets_js_1["default"].App({});
/**
 *
 * SERVER
 *
 */
app.ws("/*", {
    idleTimeout: 0,
    open: function (ws) {
        console.log("-------------------");
        console.log("WEBSOCKET CONNECTED");
    },
    message: message_1["default"]
});
var PORT = parseInt(process.env.PORT) || 3001;
app.listen("0.0.0.0", PORT, function (listenSocket) {
    listenSocket
        ? console.log("Listening to port: ".concat(PORT))
        : console.log("Failed to listen");
});

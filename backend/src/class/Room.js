"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Room_id, _Room_code, _Room_clientMap;
exports.__esModule = true;
var nanoid_1 = require("nanoid");
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
// import { TYPES, TOPICS, clientData } from "../TOPICS";
var Room = /** @class */ (function () {
    function Room() {
        _Room_id.set(this, (0, nanoid_1.nanoid)());
        _Room_code.set(this, (0, nanoid_1.customAlphabet)(characters, 6)());
        _Room_clientMap.set(this, new Map());
    }
    Room.prototype.subscribe = function (ws) { };
    Room.prototype.addClient = function (id, ws) {
        __classPrivateFieldGet(this, _Room_clientMap, "f").set(id, ws);
    };
    Room.prototype.removeClient = function (id) {
        __classPrivateFieldGet(this, _Room_clientMap, "f")["delete"](id);
    };
    Room.prototype.getCient = function (id) {
        if (__classPrivateFieldGet(this, _Room_clientMap, "f").has(id)) {
            return __classPrivateFieldGet(this, _Room_clientMap, "f").get(id);
        }
        else {
            return console.error("ERROR: NO CLIENT FOUND");
        }
    };
    Object.defineProperty(Room.prototype, "size", {
        get: function () {
            return __classPrivateFieldGet(this, _Room_clientMap, "f").size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "code", {
        get: function () {
            return __classPrivateFieldGet(this, _Room_code, "f");
        },
        enumerable: false,
        configurable: true
    });
    return Room;
}());
exports["default"] = Room;
_Room_id = new WeakMap(), _Room_code = new WeakMap(), _Room_clientMap = new WeakMap();
console.log(new Room().size);

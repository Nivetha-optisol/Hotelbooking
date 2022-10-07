"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
// DATABASE FOR ROOMS
var RoomSchema = new mongoose_1["default"].Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    maxPeople: {
        type: Number
    },
    desc: {
        type: String
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }]
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("Room", RoomSchema);
//# sourceMappingURL=Room.js.map
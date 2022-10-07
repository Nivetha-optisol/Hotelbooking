"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
// DATABASE FOR HOTEL
var HotelSchema = new mongoose_1["default"].Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    title: {
        type: String
    },
    distance: {
        type: String
    },
    photos: {
        type: [String]
    },
    desc: {
        type: String
    },
    review: {
        type: []
    },
    rooms: {
        type: [String]
    },
    cheapestPrice: {
        type: Number
    },
    featured: {
        type: Boolean,
        "default": false
    }
});
exports["default"] = mongoose_1["default"].model("Hotel", HotelSchema);
//# sourceMappingURL=Hotel.js.map
"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var AdminSchema = new mongoose_1["default"].Schema({
    username: {
        type: String,
        // required: true,
        unique: true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    img: {
        type: String
    },
    city: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        "default": true
    }
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("Admin", AdminSchema);
//# sourceMappingURL=Admin.js.map
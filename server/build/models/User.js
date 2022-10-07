"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
// DATABASE FOR USERS
var UserSchema = new mongoose_1["default"].Schema({
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
        "default": false
    },
    googleId: {
        type: String
    },
    isVerified: {
        type: Boolean
    },
    emailToken: { type: String }
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("User", UserSchema);
//# sourceMappingURL=User.js.map
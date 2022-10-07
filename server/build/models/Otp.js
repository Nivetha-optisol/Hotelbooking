"use strict";
exports.__esModule = true;
exports.Otp = void 0;
var mongoose_1 = require("mongoose");
var OtpSchema = new mongoose_1["default"].Schema({
    email: { type: String },
    code: { type: String },
    expiresIn: { type: Number },
    timeStamps: { type: Boolean, "default": true }
});
exports.Otp = mongoose_1["default"].model("Otp", OtpSchema);
//# sourceMappingURL=Otp.js.map
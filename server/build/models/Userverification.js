"use strict";
exports.__esModule = true;
exports.userVerification = void 0;
var mongoose_1 = require("mongoose");
var userVerificationSchema = new mongoose_1["default"].Schema({
    userId: { type: String },
    uniqueString: { type: String },
    createdAt: { type: Date },
    expiresAt: { type: Date }
});
exports.userVerification = mongoose_1["default"].model("userVerification", userVerificationSchema);
//# sourceMappingURL=userVerification.js.map
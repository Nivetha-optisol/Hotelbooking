"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
// DATABASE FOR HOTEL
var UserRatingSchema = new mongoose_1["default"].Schema({
    name: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    review: {
        type: String
    }
});
var UserRating = mongoose_1["default"].model("UserRating", UserRatingSchema);
exports["default"] = UserRating;
//# sourceMappingURL=UserRating.js.map
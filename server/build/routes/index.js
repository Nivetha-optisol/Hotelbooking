"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require('cors');
var app = express();
app.use(cors());
var auth_1 = require("../routes/auth");
var users_1 = require("../routes/users");
var hotels_1 = require("../routes/hotels");
var rooms_1 = require("../routes/rooms");
var payment_1 = require("../routes/payment");
app.use("/api/auth", auth_1["default"]);
app.use("/api/users", users_1["default"]);
app.use("/api/hotels", hotels_1["default"]);
app.use("/api/rooms", rooms_1["default"]);
app.use("/api/payment", payment_1["default"]);
exports["default"] = app;
//# sourceMappingURL=index.js.map
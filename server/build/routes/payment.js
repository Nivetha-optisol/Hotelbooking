"use strict";
exports.__esModule = true;
var express = require("express");
var payment_1 = require("../controllers/payment");
var Pay = new payment_1.pay();
var router = express.Router();
router.post("/", Pay.payment);
exports["default"] = router;
//# sourceMappingURL=payment.js.map
"use strict";
exports.__esModule = true;
var express = require("express");
// import { changePassword, emailVerified, GoogleSignIn, login, register, verifyPasswordMail } from "../controllers/auth";
var auth_1 = require("../controllers/auth");
var Auth = new auth_1.Authentication();
// ROUTING FOR LOGIN AND REGISTER
var router = express.Router();
var express_validator_1 = require("express-validator");
router.post("/register", (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 5 }), Auth.register);
router.get("/verify-email", Auth.emailVerified);
router.post("/vpm", Auth.verifyPasswordMail);
router.post("/changepassword", Auth.changePassword);
router.post("/login", Auth.login);
router.post("/googleLogin", Auth.GoogleSignIn);
exports["default"] = router;
//# sourceMappingURL=auth.js.map
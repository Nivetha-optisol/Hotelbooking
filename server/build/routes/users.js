"use strict";
exports.__esModule = true;
var express = require("express");
var user_1 = require("../controllers/user");
var verifyToken_1 = require("../utils/verifyToken");
var crudusers = new user_1.users();
var router = express.Router();
// ROUTING FOR USERS
//  update
router.put("/:id", verifyToken_1.visibleuser, crudusers.updateUser);
//  Delete 
router["delete"]("/:id", verifyToken_1.visibleuser, crudusers.deleteUser);
// get by id
router.get("/:id", verifyToken_1.visibleuser, crudusers.getUserbyid);
// get all  
router.get("/", verifyToken_1.verifyAdmin, verifyToken_1.visibleuser, crudusers.getUsers);
exports["default"] = router;
//# sourceMappingURL=users.js.map
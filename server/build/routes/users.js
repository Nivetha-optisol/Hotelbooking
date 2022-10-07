"use strict";
exports.__esModule = true;
var express = require("express");
var user_1 = require("../controllers/user");
var verifyToken_1 = require("../utils/verifyToken");
var crudusers = new user_1.users();
var router = express.Router();
// ROUTING FOR USERS
//  update
router.put("/:id", crudusers.updateUser);
//  Delete 
router["delete"]("/:id", crudusers.deleteUser);
// get by id
router.get("/:id", crudusers.getUserbyid);
// get all  
router.get("/", verifyToken_1.verifyAdmin, crudusers.getUsers);
exports["default"] = router;
//# sourceMappingURL=users.js.map
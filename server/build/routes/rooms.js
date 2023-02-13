"use strict";
exports.__esModule = true;
var express = require("express");
var room_1 = require("../controllers/room");
var Crudroom = new room_1.crudroom();
var verifyToken_1 = require("../utils/verifyToken");
// ROUTING FOR ROOMS
var router = express.Router();
// create
router.post("/:hotelid", verifyToken_1.verifyAdmin, verifyToken_1.visibleroom, Crudroom.createRoom);
//  update
router.put("/:id", verifyToken_1.verifyAdmin, verifyToken_1.visibleroom, Crudroom.updateRoom);
//  Updating Availability room , unavailableid
router.put("/availability/:id", verifyToken_1.visibleroom, Crudroom.updateRoomAvailability);
//  Delete 
router["delete"]("/:id", verifyToken_1.verifyAdmin, verifyToken_1.visibleroom, Crudroom.deleteRoom);
// get by id
router.get("/:id", verifyToken_1.visibleroom, Crudroom.getroombyid);
// get all  
router.get("/", verifyToken_1.visibleroom, Crudroom.getroom);
exports["default"] = router;
//# sourceMappingURL=rooms.js.map
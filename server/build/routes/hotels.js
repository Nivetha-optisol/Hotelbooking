"use strict";
exports.__esModule = true;
var express = require("express");
var hotel_1 = require("../controllers/hotel");
var crudhotel = new hotel_1.hotel();
// import { createHotel, deleteHotel, gethotel, gethotelbyid, getHotelRooms, getRating, setRating, updateHotel } from "../controllers/hotel";
var verifyToken_1 = require("../utils/verifyToken");
// ROUTING FOR HOTELS
var router = express.Router();
// create,
router.post("/", verifyToken_1.verifyAdmin, crudhotel.createHotel);
//  update
router.put("/:id", verifyToken_1.verifyAdmin, crudhotel.updateHotel);
//  Delete 
router["delete"]("/:id", verifyToken_1.verifyAdmin, crudhotel.deleteHotel);
// get by id
router.get("/:id", crudhotel.gethotelbyid);
// get all  
router.get("/", crudhotel.gethotel);
// room/hotelid
router.get("/room/:id", crudhotel.getHotelRooms);
// rating
router.post("/rating/:id", crudhotel.setRating);
router.get("/rating/:id", crudhotel.getRating);
exports["default"] = router;
//# sourceMappingURL=hotels.js.map
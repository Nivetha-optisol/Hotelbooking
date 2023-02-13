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
router.post("/", verifyToken_1.verifyAdmin, verifyToken_1.visiblehotel, crudhotel.createHotel);
//  update
router.put("/:id", verifyToken_1.verifyAdmin, verifyToken_1.visiblehotel, crudhotel.updateHotel);
//  Delete 
router["delete"]("/:id", verifyToken_1.verifyAdmin, verifyToken_1.visiblehotel, crudhotel.deleteHotel);
// get by id
router.get("/:id", verifyToken_1.visiblehotel, crudhotel.gethotelbyid);
// get all  
router.get("/", verifyToken_1.visiblehotel, crudhotel.gethotel);
// room/hotelid
router.get("/room/:id", verifyToken_1.visiblehotel, crudhotel.getHotelRooms);
// rating
router.post("/rating/:id", verifyToken_1.visiblehotel, crudhotel.setRating);
router.get("/rating/:id", verifyToken_1.visiblehotel, crudhotel.getRating);
exports["default"] = router;
//# sourceMappingURL=hotels.js.map
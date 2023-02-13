import * as express from "express"
import{hotel} from "../controllers/hotel"
const crudhotel = new hotel();
// import { createHotel, deleteHotel, gethotel, gethotelbyid, getHotelRooms, getRating, setRating, updateHotel } from "../controllers/hotel";

import { verifyAdmin, visiblehotel } from "../utils/verifyToken";
// ROUTING FOR HOTELS
const router =express.Router();
// create,
 router.post("/" ,verifyAdmin  ,visiblehotel,crudhotel.createHotel ) 
   

  
 

//  update
 router.put("/:id",verifyAdmin ,visiblehotel,crudhotel.updateHotel)

//  Delete 
router.delete("/:id",verifyAdmin , visiblehotel ,crudhotel.deleteHotel)
// get by id
router.get("/:id"  , visiblehotel ,crudhotel.gethotelbyid)

// get all  
router.get("/" ,visiblehotel,crudhotel.gethotel); 
// room/hotelid
router.get("/room/:id" ,  visiblehotel,crudhotel.getHotelRooms )  
// rating
router.post("/rating/:id" ,visiblehotel, crudhotel.setRating   ) 
router.get("/rating/:id"  ,visiblehotel, crudhotel.getRating) 




 export default router
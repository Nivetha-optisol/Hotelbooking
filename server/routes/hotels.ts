import * as express from "express"
import{hotel} from "../controllers/hotel"
const crudhotel = new hotel();
// import { createHotel, deleteHotel, gethotel, gethotelbyid, getHotelRooms, getRating, setRating, updateHotel } from "../controllers/hotel";

import { verifyAdmin } from "../utils/verifyToken";
// ROUTING FOR HOTELS
const router =express.Router();
// create,
 router.post("/" ,verifyAdmin ,crudhotel.createHotel ) 
   

  
 

//  update
 router.put("/:id",verifyAdmin ,crudhotel.updateHotel)

//  Delete 
router.delete("/:id",verifyAdmin , crudhotel.deleteHotel)
// get by id
router.get("/:id" ,crudhotel.gethotelbyid)

// get all  
router.get("/" ,crudhotel.gethotel); 
// room/hotelid
router.get("/room/:id" ,crudhotel.getHotelRooms )  
// rating
router.post("/rating/:id" , crudhotel.setRating   ) 
router.get("/rating/:id"  , crudhotel.getRating) 




 export default router
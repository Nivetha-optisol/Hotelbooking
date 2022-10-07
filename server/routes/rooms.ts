import * as express from "express"
import { Request, Response } from 'express';
import { crudroom } from "../controllers/room";
const Crudroom = new crudroom();

import { verifyAdmin } from "../utils/verifyToken";
// ROUTING FOR ROOMS
const router =express.Router();
// create
 router.post("/:hotelid",verifyAdmin ,Crudroom.createRoom ) 
   

  
 

//  update
 router.put("/:id"  ,verifyAdmin ,Crudroom.updateRoom)
//  Updating Availability room , unavailableid
 router.put("/availability/:id"  ,Crudroom.updateRoomAvailability)


//  Delete 
router.delete("/:id" ,verifyAdmin ,Crudroom. deleteRoom)
// get by id
router.get("/:id" ,Crudroom.getroombyid)

// get all  
router.get("/" ,Crudroom.getroom);
 




 export default router
import * as express from "express"
import { Request, Response } from 'express';
import { crudroom } from "../controllers/room";
const Crudroom = new crudroom();

import { verifyAdmin, visibleroom } from "../utils/verifyToken";
// ROUTING FOR ROOMS
const router =express.Router();
// create
 router.post("/:hotelid",verifyAdmin   ,visibleroom ,Crudroom.createRoom ) 
   

  
 

//  update
 router.put("/:id"  ,verifyAdmin ,visibleroom ,Crudroom.updateRoom)
//  Updating Availability room , unavailableid
 router.put("/availability/:id"  ,  visibleroom ,Crudroom.updateRoomAvailability)


//  Delete 
router.delete("/:id" ,verifyAdmin  ,visibleroom ,Crudroom. deleteRoom)
// get by id
router.get("/:id" , visibleroom ,Crudroom.getroombyid)

// get all  
router.get("/" , visibleroom ,Crudroom.getroom);
 




 export default router
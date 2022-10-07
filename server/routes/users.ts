import * as express from "express"
import { Request, Response } from 'express';
import{ users }from "../controllers/user"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken";
const  crudusers= new users();
const router =express.Router();

// ROUTING FOR USERS
 //  update
 router.put("/:id" ,crudusers.updateUser);

//  Delete 
router.delete("/:id" ,  crudusers.deleteUser)
// get by id
router.get("/:id" ,crudusers. getUserbyid)

// get all  
router.get("/" ,verifyAdmin ,crudusers.getUsers);
 


 export default router
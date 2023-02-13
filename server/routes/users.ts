import * as express from "express"
import { Request, Response } from 'express';
import{ users }from "../controllers/user"
import { verifyAdmin, verifyToken, verifyUser, visibleuser } from "../utils/verifyToken";
const  crudusers= new users();
const router =express.Router();

// ROUTING FOR USERS
 //  update
 router.put("/:id" ,  visibleuser ,crudusers.updateUser);

//  Delete 
router.delete("/:id" , visibleuser, crudusers.deleteUser)
// get by id
router.get("/:id" ,  visibleuser,crudusers. getUserbyid)

// get all  
router.get("/" ,verifyAdmin  ,  visibleuser,crudusers.getUsers);
 


 export default router





 
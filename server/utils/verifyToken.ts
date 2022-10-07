const jwt =require('jsonwebtoken')
import { Request, Response } from "express"
import { CLIENT_RENEG_LIMIT } from "tls";
import User from "../models/User";
import  {createError}from "../utils/error"

export const verifyToken = (req, res, next) => {
    const token:any = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      next();
    });
  };

  export const verifyUser =async (req, res, next) => {
   // console.log("isAdmin",req.headers.isadmin)
 
    verifyToken(req, res,async () => {
      console.log(req.params.id)
      const isadmin = req.headers.isadmin;
      const _id = JSON.parse(isadmin)._id
      console.log("admin",isadmin);
    
      const userdata= await (await User.findById(_id))
      console.log("userdata" ,userdata);
   if (userdata._id === req.params.id || userdata.isAdmin) {
        next();
      } else {
        return res.json("You are not authorized!");
      }
    });
  };
  export const verifyAdmin = async(req, res, next) => {
  
    verifyToken(req, res, async () => {
      console.log(req.params.id)
      const isadmin = req.headers.isadmin;
      if (isadmin ) {
        next();
      } 
      else {
        return res.json("You are not authorized!");
      }
      // if(isadmin){
      //   const _id = JSON.parse(isadmin)._id
      //   const userdata= await (await User.findById(_id))
      //   console.log("userdata" ,userdata);
      
      // }
    
      console.log("admin",isadmin);
    
    
  
      })
    }
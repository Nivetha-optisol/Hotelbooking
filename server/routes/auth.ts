import * as express from "express"
import { Request, Response } from 'express';
// import { changePassword, emailVerified, GoogleSignIn, login, register, verifyPasswordMail } from "../controllers/auth";
import {Authentication} from "../controllers/auth"
const Auth=new Authentication();
// ROUTING FOR LOGIN AND REGISTER
const router =express.Router();
import { body, validationResult } from 'express-validator';

 router.post("/register"  , body('email').isEmail(),

 body('password').isLength({ min: 5 })   ,Auth.register )
 router.get("/verify-email"  ,Auth.emailVerified )
 router.post("/vpm"  ,Auth.verifyPasswordMail )
 router.post("/changepassword"  ,Auth.changePassword )

 router.post("/login"     ,Auth.login )
 router.post("/googleLogin"  ,Auth.GoogleSignIn )


 export default router
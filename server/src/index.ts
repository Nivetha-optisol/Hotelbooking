

import * as express from "express"
import  * as dotenv from "dotenv"
import mongoose from "mongoose";
import route from "../routes/index"
var cookieParser = require('cookie-parser')
const bodyparser = require("body-parser");
var cors = require('cors')


const app:express.Application =express();
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors())

dotenv.config()

const url :string = process.env.MONGO

   const connect=async()=>{
    try{
     mongoose.connect(url );
     console.log("connected to mongodb")

}catch(error){
handleError(error);
}}
// to save jwt token in cookie
app.use(cookieParser())
// middleware to connect mongo
app.use(express.json())

app.use(route);


// Error handling using middleware
app.use((err ,req ,res,next)=>{
    const errorStatus:any = err.status || 500 
    const  errorMessage:any = err.message || "Some thing went wrong"
return  res.status(errorStatus).json({
    success : false ,
    status :errorStatus ,
    message :errorMessage ,
    stack :err.stack ,
})
}
)





mongoose.connection.on("disconnected" ,()=>{
    console.log("mongo disconnected"); 
})



   


app.listen(8005,() =>{
    connect()

    console.log(" connected backend ");

})

function handleError(error: any) {
    throw new Error("Function not used.");
}


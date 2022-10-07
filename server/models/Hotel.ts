import mongoose from "mongoose";
import UserRating from "./UserRating";
// DATABASE FOR HOTEL

const HotelSchema = new mongoose.Schema({

    name:{
        type:String ,
        
       
    } ,
    type:{
        type:String ,
      
       
    } ,
    
         city:{
        type:String ,
     
      
    } ,

    address:{
        type:String ,

    
    } ,
  title:{
        type:String ,

    
    } ,
    distance:{
        type:String ,
       
    } ,

    photos:{
        type:[String] ,
       
    } ,
    desc:{
        type:String ,
        

       
    } ,
    review:{
        type :[],  
       

    } ,
    rooms:{
        type :[String] ,  
    },
    cheapestPrice:{
        type:Number ,
       
    } ,
    featured :{
        type :Boolean  ,
        default : false ,
    }


});

export default mongoose.model("Hotel" ,HotelSchema)


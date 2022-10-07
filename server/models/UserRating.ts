import mongoose from "mongoose";

// DATABASE FOR HOTEL

const UserRatingSchema = new mongoose.Schema({

    name:{
        type:String ,
        
    
    },
  
    rating:{
        type :Number ,
        min:0 ,
        max :5

    } ,
    review:{
        type:String , 

    }
 
   


});
const UserRating = mongoose.model("UserRating",UserRatingSchema)

export default UserRating
import mongoose from "mongoose";

// DATABASE FOR USERS
const UserSchema = new mongoose.Schema(
    {
        username: {
          type: String,
          // required: true,
          unique: true,
        },
        email: {
          type: String,
          // required: true,
          unique: true,
        },
       
        img: {
          type: String,
        },
        city: {
          type: String,
       
        },
        phone: {
          type: String,
          
        },
        password: {
          type: String,
          // required: true,
        },
        isAdmin: {
          type: Boolean,
          default: false,
        },
        googleId:{
          type:String,
        },
        isVerified:{
          type:Boolean

        },
        emailToken:{type:String}
      },
  

{timestamps : true}



);

export default mongoose.model("User" ,UserSchema)


import mongoose from "mongoose";

const userVerificationSchema =new  mongoose.Schema({
    userId:{type:String},
    uniqueString:{type:String},
    createdAt:{type:Date},
    expiresAt:{type:Date},
    
})
export const userVerification = mongoose.model("userVerification",userVerificationSchema)
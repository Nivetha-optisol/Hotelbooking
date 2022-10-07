import Room from "../models/Room";
import Hotel from "../models/Hotel";
import{createError}from "../utils/error"
import { Request, Response } from "express";
 
// *******************************************************************  CRUD CODE FOR ROOM******************************************************
export class crudroom {

// CREATING A ROOM 
  createRoom  = async(req:Request   , res:Response   ,next)=>{
    const hotelId:String = req.params.hotelid;
    const newRoom:any = new Room(req.body);
    console.log(newRoom);

    try{
        const  savedRoom:any = await newRoom.save();
    
      
        try{
            await Hotel.findByIdAndUpdate(hotelId ,  {
                $push :{rooms:savedRoom._id},
                
            } );
                   console.log("hiiiiiiiiiiiii")
        }catch(err){
            return next(err)
        }
        res.status(200).json(savedRoom);
    }   catch(err){
        next(err);
    } 
}

// UPDATING A ROOM
 updateRoom = async (req:Request,res:Response,next)=>{
    try{
        const updateRoom:any = await Room.findByIdAndUpdate(req.params.id  ,{$set:req.body} , {new:true})
        res.status(200).json(updateRoom)
    
       }
       catch(err){
    
       next(err)
       }

} 

// updating Available rooms
updateRoomAvailability = async (req:Request, res:Response, next:any) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };
// DELETING A ROOM
 deleteRoom = async (req:Request,res:Response,next:any)=>{
  const roomId:any = req.params.id;
const  hotel:any=await Hotel.find({
  rooms: {$in:roomId}
}


  
)
console.log(hotel)
   
    try {
      if(hotel.length > 0){
        const hotelId = hotel[0]._id;
      await Room.findByIdAndDelete(roomId);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: roomId },
        });
      } catch (err) {
        next(err);
      }
      return res.status(200).json("Room has been deleted.");
      }else{
        await Room.findByIdAndDelete(roomId);
        return res.status(200).json("Room has been deleted.");
      }   
    } catch (err) {
      next(err);
    }

}
// GET ROOM BY ID
getroombyid = async (req:Request,res:Response,next:any)=>{
    
    try {
        const  room =await Room.findById(
            req.params.id
        );
        res.status(200).json(room);
    }
    catch(err){
        res.status(500).json(err)
    }
}

// GET ALL ROOMS
 getroom = async (req:Request,res:Response,next)=>{








  
   
    try {
     const  rooms =await Room.find();
     res.status(200).json(rooms);
 }
 catch(err){
    //  res.status(500).json(err)
    next(err)
 }
    
    
}
}
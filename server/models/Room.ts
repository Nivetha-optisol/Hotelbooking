import mongoose from "mongoose";
// DATABASE FOR ROOMS
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
     
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    maxPeople: {
      type: Number,
      // required: true,
    },
    desc: {
      type: String,
     
      // required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
import { Request, Response } from "express";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import Hotel from "../models/Hotel";

import Room from "../models/Room";
import UserRating from "../models/UserRating";

// *********************************************   CRUD CODE    for hotel ***********************************************

export class hotel {
  // Creating a hotel
  createHotel = async (req: Request, res: Response, next: any) => {
    const newHotel = new Hotel(req.body);
    try {
      const savedHotel: any = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (err) {
      next(err);
    }
  };

  // Update a hotel
  updateHotel = async (req: Request, res: Response, next) => {
    try {
      const currentHotel: String = await Hotel.findById(req.params.id);
      console.log("update", currentHotel);
      // console.log(req.body)
      const updateHotel: String = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateHotel);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  // delete a hotel
  deleteHotel = async (req: Request, res: Response, next) => {
    try {
      const currentHotel: any = await Hotel.findById(req.params.id);
      console.log("del", currentHotel);
      currentHotel.rooms.forEach(async (e) => {
        await Room.findByIdAndDelete(e);                                                                                                                                                                                                                                                       
        // console.log("rooms",e)
      });
      await Hotel.findByIdAndDelete(req.params.id);
      return res.status(200).json("Hotel has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  };
  // getting a hotel by id
  gethotelbyid = async (req: Request, res: Response, next) => {
    try {
      

      const hotel: String = await Hotel.findById(req.params.id);
   
      
        res.status(200).json(hotel);
     
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // get all hotels
  gethotel = async (req: Request, res: Response, next) => {
    console.log("hello");
    const { min, max, ...others } = req.query;

    try {
      if (min && max) {
        const hotels: any = await Hotel.find({
          ...others,
          cheapestPrice: { $gt: min || 1, $lt: max || 999 },
        });
        return res.status(200).json(hotels);
      }
      const hotels: any = await Hotel.find({
        ...others,
      });
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };

  // getrooms
  getHotelRooms = async (req: Request, res: Response, next: any) => {
    try {
      const hotel: any = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

  // rating

  setRating = async (req: Request, res: Response, next: any) => {
    const newRating = new UserRating(req.body);
    try {
      const savedRating: any = await newRating.save();
      await Hotel.findByIdAndUpdate(req.params.id, {
        $push: { review: savedRating },
      });

      return res.status(200).json("Rating Save!!!");
    } catch (err) {
      next(err);
    }
  };

  getRating = async (req: Request, res: Response, next: any) => {
    try {
      const rating: string = await UserRating.findById(req.params.id);
      res.status(200).json(rating);
    } catch (err) {
      next(err);
    }
  };
}

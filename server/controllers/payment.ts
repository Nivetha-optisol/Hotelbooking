import { Request, Response } from "express";
require("dotenv").config();
const key = process.env.STRIPE_KEY ;
const Stripe =require("stripe")
const stripe_payment = Stripe(key)
export class pay{
  payment = async(req:Request   , res:Response )=>{
  const {roomNumbs}:any = req.body;
  console.log("rooms:",roomNumbs)
const{details}:any=req.body ;
console.log(req.body)
const line_items = details?.map((item)=>{
  return{
    price_data : {
      currency:'inr' ,
      product_data:{
        name:item.title
      },
      unit_amount:item.price*100 ,
    },
    quantity :item.maxPeople ,


  }
});

// console.log("details  : "   ,line_items  )
    const
     paymentsession = await stripe_payment.checkout.sessions.create({
    
        line_items,   
   
        mode : 'payment' ,
        success_url :`http://localhost:3000/success` ,
        cancel_url : `http://localhost:3000/failure`


    });
    res.send({
        url:paymentsession.url
    });
    
}
}
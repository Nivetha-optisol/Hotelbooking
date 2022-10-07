import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import "./paynow.css";
import hotel from "./hotel.json"

import  pay from "./pay.png";
import Lottie from 'lottie-react'




const Paynow = () => {

    const {user}=useContext(AuthContext);
    const location:any =  useLocation();
    console.log(location.state)

    // modal 

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
      };

      if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }
    
    

    const roomsDataBooked = (rooms)=>{
        let bookedRooms = []
        location.state.data.map((room)=>{
            for(let i =0 ;i<rooms.length;i++){
            room.roomNumbers.map((e)=>{
                if(e._id === rooms[i]){
                   let roomData = {
                    number:e.number,
                    title: room.title,
                    price:room.price,
                    maxPeople:1
                   }
                   bookedRooms.push(roomData)
                }
            })
         }
        })
        return bookedRooms
    }

const Handlepay=()=>{
   const details = roomsDataBooked(location.state.selectedRooms)
console.log(details)
 axios.post("http://localhost:8005/api/payment"  , {
    details  ,
    user_id:user._id
 })  

.then((res)=>{
    if(res.data.url){
        window.location.href = res.data.url
        console.log(res.data.url)
    }
})
.catch((err)=>{

    console.log(err.message);

   })







   
}

  return (
    <div >
    
 



<div className="card transition">
  <h2 className="h2">Pay Now</h2>
  <p  className='para'>Pay for online hotel bookings by making a deposit with a credit card, or paying in full for the best rates.</p>
  <div className="cta-container transition"><button className="cta" onClick={Handlepay}>Pay</button></div>
  <div className="card_circle transition"></div>
</div>


    </div>
  
  )
}

export default Paynow
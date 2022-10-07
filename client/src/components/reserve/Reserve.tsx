import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Hotel } from '@material-ui/icons'
import { listenerCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import Paynow from '../paynow/Paynow'
import "./reserve.css"

const Reserve = ({setOpenModel , hotelId}) => {
    
    const [selectedRooms , setSelectedRooms] = useState([]);
    const [currentRooms,setCurrentRooms] = useState([])
    let filledRooms = []
    const {dates}=useContext(SearchContext)
        const{data , loading ,error} = useFetch(`http://localhost:8005/api/hotels/room/${hotelId}`)
        console.log(dates,"dsrgfe");


        const getDatesInRange = (startDate ,endDate)=>{
            const start =new Date(startDate);
            const end =new Date(endDate) ;
            const date = new Date(start.getTime());

let list=[]

            while(date<=end){
                list.push(new Date(date).getTime())
                date.setDate(date.getDate()+1)
            }
            return list ;

        };
     const alldates =   getDatesInRange(dates[0]?.startDate ,dates[0]?.endDate);

     const isAvailable = (roomNumber)=>{
        // if its includes the room is filled
        const isFound = roomNumber.unavailableDates.some((date)=>
        alldates.includes(new Date(date).getTime()));
        // the room is not filled 
         return !isFound
     }

        const handleSelect =(e)=>{
            const checked = e.target.checked;
            const value = e.target.value;
            setSelectedRooms(
                checked ?[...selectedRooms,value]:selectedRooms.filter((item)=>item !== value)

                
            );
            console.log(selectedRooms)
        };
        const   navigate = useNavigate()
        const handleClick=async()=>{
            console.log(selectedRooms)
console.log("reservenow");



            try{
                await Promise.all(
                    selectedRooms.map(async roomId=>{
                    const res=await axios.put(`http://localhost:8005/api/rooms/availability/${roomId}`,
                        {
                            dates: alldates,
                        });
                    return res.data
                }));



                setOpenModel(false);
                 navigate("/payment",{state:{
                  selectedRooms,
                  data
                 }})
                //isAllRoomsFilled();

            }  catch(err){

            }


        }
      
        console.log(selectedRooms)

        //Rooms filled or not
        const isAllRoomsFilled = ()=>{
            try {
                const total = data.map((item)=>{
                    item.roomNumbers.map((roomNumber)=>{
                        if(isAvailable(roomNumber)){
                            console.log(roomNumber)
                        }else{
                            filledRooms.push(item)
                            //window.sessionStorage.setItem('filled',JSON.stringify({filledRooms:filledRooms}))
                            
                        }

                    })
                    return item.roomNumbers.length
                   })
                    let totalSum = 0;
                    for(let i = 0;i<total.length;i++){
                        totalSum = totalSum+total[i]
                    }
                    console.log(totalSum,filledRooms.length)
                   if(totalSum === filledRooms.length){
                    return true
                   }else{
                    return false
                   }
            } catch (error) {
                
            }
                                      
                                     
        }
        // useEffect(()=>{
        //     isAllRoomsFilled()
        // })
  return (
    <div className='reserve'>
        <div className="rContainer">
        
            <FontAwesomeIcon  icon={faCircleXmark} className="rClose" onClick={ ()=>setOpenModel(false)}/>
            <span>Select your Rooms:</span>
            {data ? (
                data.map(item=>(
                    <div key={item._id}>
                    <div className="rItem">
                        <div className="rItemInfo">
                           <div className="rTitle"><b>{item?.title}</b></div>
                            <div className="rDesc">{item?.desc} </div>
                            <div className="rMax">Max People:<b>{item?.maxPeople}</b></div>
                            <div className="rPrice"><b>&#8377;{item?.price}</b></div>
    
    
    
                        </div>
                        <div className="rSelectRooms">
                        {item.roomNumbers.map((roomNumber)=>(
                        <div key={roomNumber._id}>
                            <div className="room">
                                <label>{roomNumber.number}</label>
                                <input type="checkbox" value={roomNumber._id} onChange={handleSelect}   disabled={!isAvailable(roomNumber)}/>
                            </div>
                            </div>
                        ))}</div>
                    </div>
                    </div>
                ))
            ):null} 
          <button  onClick={handleClick} className="rButton" disabled={isAllRoomsFilled()}>Reserve Now!</button>
          
        </div>
       </div>
  )
}

export default Reserve
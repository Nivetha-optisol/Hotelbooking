import React, { useContext, useState } from 'react'
import "./star.css";
import {FaStar} from "react-icons/fa"
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Star = () => {
  const location:any = useLocation()
  console.log(location);
  
  const {user}=useContext(AuthContext);

  
  
  const id=location.pathname.split("/")[2]
    const[rating ,setRating] =useState(null) ;
    const[review ,setReview] =useState("") ;

    const[hover,setHover] =useState(null) ;
    const handleClick =async (e) =>{
      e.preventDefault();
      
     await axios.post(`http://localhost:8005/api/hotels/rating/${id}`,{rating,review,name:user.username})
    toast("Rated Successfully")
   
    }
    
    console.log(handleClick);
    
  return (
    <div>



  



        {
       
            [...Array(5)].map((star,i) =>{

                const ratingValue = i+1 ;
                return   <label>
                 <input className='rating'
                  type="radio"  name='rating'
        
                   value={ratingValue}
                   onClick={() => setRating(ratingValue)}
                 
                 
                />
                    <FaStar   className='star'  
                    color={ratingValue <= (hover || rating) ?"#ffc107" : "#808080"}  
                    onMouseEnter={()=>setHover(ratingValue)}
                    onMouseLeave = {()=>setHover(null)}
                    
                    />
                     </label>;      
            })   
        }
         <p>rating is{rating}..</p>          
         <input type="text"    className='review' name="review"    autoComplete="off"  placeholder='Review' onChange={(e)=>setReview(e.target.value)} />
         <button type="button"  className='rate' onClick={handleClick}>Rate</button>                    
        </div>
  )
}

export default Star                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

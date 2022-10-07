import "./hotel.css" 

import { faCircle, faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import Reserve from "../../components/reserve/Reserve"
import Star from "../../components/star/Star"



const Hotel = () => {

const location:any = useLocation()
console.log(location);



const id=location.pathname.split("/")[2]
  const [slideNumber ,setSlideNumber]=useState (0);
  const [openModel , setOpenModel] =useState(false);
  const [openRoom , setOpenRoom]  = useState(false);
  const  {data ,loading ,error  }=useFetch(`api/hotels/${id}`);

 const {dates , options} = useContext(SearchContext);
 const {user} =useContext(AuthContext);
 const navigate = useNavigate()

 console.log("Hello Nivetha")

 console.log("Search:" ,SearchContext);
 
console.log();
 const MILLISECONDS_PER_DAY =1000*60*60*24 ;
 console.log(MILLISECONDS_PER_DAY);

 function dayDifference(date1 ,date2){
  const start =new Date(date1);
            const end =new Date(date2) ;
  const timeDiff =Math.abs(end?.getTime()-start?.getTime());
  const diffDays =Math.ceil(timeDiff/MILLISECONDS_PER_DAY );
  return diffDays;
 }
//  const days=0 ;
const days=(dayDifference(dates[0]?.endDate , dates[0]?.startDate))
  const handleOpen=(i:any)=>{
    setSlideNumber(i);
    setOpenModel(true);
  };
  console.log( " Dates "+  dates[0]?.startDate   );
  
  const handleMove = (direction: string) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleClick = ()=>{
                               if(user) {
                                setOpenRoom(true);
                               }
                               else{
                                navigate("/login")
                               }
  }
  return (
    <div>
        <Navbar/>
        <Header  type="list"/>
       {loading ? ("loading"):(<div className="hotelContainer">
         {openModel&& (
         <div className="slider">
          
        <FontAwesomeIcon icon={ faCircleXmark}  className="close"  onClick={()=>setOpenModel(false)}/>
        <FontAwesomeIcon icon={ faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
        <div className="sliderWrapper">
                  <img src={data.photos[slideNumber]} alt="" className='sliderImg'/>
                </div>
        <FontAwesomeIcon icon={ faCircleArrowRight}   className="arrow"
              onClick={()=>handleMove("r")} /> 

          </div>)}
          <div className="hotelWrapper">
        
            <h1 className="hotelTitle"> {data?.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot}/>
              <span>{data?.address}</span>
            </div>
            <span className="hotelDistance">
            Excellent location – {data?.distance}m from center

            </span>
            <Star/>
         
            
          

          <div className="hotelImages">
            {
              data?.photos.map((photo ,i) =>(
                <div className="hotelImgWrapper" key={i}>
                  <img onClick={()=>handleOpen(i)}   src={photo} alt="" className='hotelImg'/>
                </div>
              ))
            }
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data?.title}</h1>
              <p className="hotelDesc">
                {data?.desc}                 
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of chennai, this property has an
                excellent location 
              </span>
              <h2>
                {/* <b>&#8377;{days * data?.cheapestPrice * options.room}</b> ({days} nights) */}
              </h2>
              <button   onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
          </div>
          <MailList/>
       
        </div>)}
 {openRoom    && <Reserve setOpenModel={setOpenRoom} hotelId={id}/>}

    </div>
  )
}

export default Hotel
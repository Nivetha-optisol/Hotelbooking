import React, { useContext } from 'react'
import "./header.css"
import {FontAwesomeIcon}from "@fortawesome/react-fontawesome"
import{faBed} from "@fortawesome/free-solid-svg-icons"

import{faCalendarDays} from "@fortawesome/free-solid-svg-icons"
import{faPerson} from "@fortawesome/free-solid-svg-icons"
import{DateRange} from 'react-date-range' ;
import { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import{format} from  "date-fns"
import { Link, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'


const Header = (props:any) => {
    const [openDate ,setOpenDate]= useState(false)
    const [dates ,setDates] = useState<any>([{
        startDate:new Date(),
        endDate: new Date() ,
        key: "selection" ,
    }]);

    const [destination , setDestination]=useState("");
    const [openOptions , setOpenOptions]=useState(false);
    const [options , setOptions]=useState<any>({


        adult:1 ,
        children:0 ,
        room:1
    });
 
 
 
    const handleOption=(name: string , operation: string)=>{
        setOptions((prev: any) => {return{
            ...prev ,
            [name]:operation ==="i" ? options[name] + 1 :options[name]-1 ,
        }

        })


    }
    const  navigate = useNavigate()

// passing it from search context
        const {dispatch} =useContext(SearchContext)
        const handleSearch=()=>{
            window.sessionStorage.setItem("key"  ,JSON.stringify ({city:destination  , dates:dates , options:options}))
            dispatch({type:"NEW_SEARCH" , payload:{destination,dates ,options}})
        navigate("/hotels" ,{state:{destination , dates,options}})
           
    
    }

    const {user}=useContext(AuthContext);
 
 
    return (
    <div className='header'>
       
    <div className={props.type==="list" ? "headerContainer listMode":"headerContainer"}>
    <div   className='headerList'>
    
   

</div>
{
props.type !=="list" &&

<><h1 className='headerTitle'> Living the hotel lifestyle is the best! </h1>
<p className='headerDesc'>
When you get into a hotel room, you lock the door, and you know there is a secrecy, there is a luxury, there is fantasy. There is comfort. There is reassurance.
</p>
{!user &&<Link to ="/register" ><button className="headerBtn"> Register</button> </Link>  }
<div  className='headerSearch'>
    <div  className='headerSearchItem'>
        <FontAwesomeIcon icon={faBed} className="headerIcon"/>
        <input type="text" placeholder='Where are you going?' className='headerSearchInput'
        onChange={(e)=>setDestination(e.target.value)}
        
        />

    </div>
    <div  className='headerSearchItem'>
        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
       <span className='headerSearchText' onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate , "dd/MM/yyyy")}

        to ${format(dates[0].endDate , "MM/dd/yyyy")}`}</span>   

       {openDate &&<DateRange 
       editableDateInputs={true} 
       onChange={(item) =>setDates([item.selection])}
       moveRangeOnFirstSelection ={false}
       ranges={dates}
       minDate={new Date()}
       className="date"
       />}

    </div>
    <div  className='headerSearchItem'>
        <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
        <span  className='headerSearchText'   onClick={()=>setOpenOptions(!openOptions)}>{`${options.adult} adult  .  ${options.children} children  .   ${options.room} room  .`}</span>
        {openOptions && <div className="options">
            <div className="optionItem"> 
              
                    <span className='optionText'>Adult</span>
                    <div className="optionCounter">
                    
                  
                    <button    disabled={options.adult <= 1} className='optionCounterButton'   onClick={()=>handleOption("adult" ,"d")}>-</button>
                    <span className='optionCounterNumber'>{options.adult}</span>
                    <button className='optionCounterButton'     onClick={()=>handleOption("adult" ,"i")}>+</button>
                    </div>

              
               
            </div>
            <div className="optionItem">
              
                    <span className='optionText'>Children</span>
                    <div className="optionCounter">
                    <button   disabled={options.children <= 0}  className='optionCounterButton'    onClick={()=>handleOption("children" ,"d")}>-</button>
                    <span className='optionCounterNumber'>{options.children}</span>
                    <button     className='optionCounterButton'    onClick={()=>handleOption("children" ,"i")} >+</button>
                    </div>
              
               
            </div>
            <div className="optionItem">
              
                    <span className='optionText'>Room</span>
                    <div className="optionCounter">
                    <button   disabled={options.room <= 1} className='optionCounterButton'    onClick={()=>handleOption("room" ,"d")}>-</button>
                    <span className='optionCounterNumber'>{options.room}</span>
                    <button className='optionCounterButton'    onClick={()=>handleOption("room" ,"i")}>+</button>

              </div>
               
            </div>
        </div>}

    </div>
    <div  className='headerSearchItem'> 
        <button className='headerBtn' onClick={handleSearch}>Search</button>

    </div>

</div></>
}

</div>
</div>
  )
 
  
}

export default Header
import format from 'date-fns/format'
import React, { useState } from 'react'
import { DateRange } from 'react-date-range'
import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import SearchItem from '../../components/searchitem/SearchItem'
import useFetch, { api } from '../../hooks/useFetch'
import nodata from "./nodata.json"
import load from "./loading.json"

import Lottie from 'lottie-react'

import "./list.css"
import { display } from '@mui/system'


const List = () => {
  const location:any =useLocation()
  console.log(location);
  const[destination ,setDestination] =useState(location?.state?.destination)
  const[dates ,setDates] =useState(location?.state?.dates)
  const[options ,setOptions] =useState(location?.state?.options)
  const [openDate ,setOpenDate]= useState(false)
  const[min,setMin]=useState("");
  const[max,setMax]=useState("");



  const {data ,loading ,error ,reFetch} = useFetch(`http://localhost:8005/api/hotels?city=${destination.toLowerCase()}&min=${min||1}&max=${max||9999999} `)

 const  searchbox =()=>{
   api.get(`api/hotels?city=${destination?.toLowerCase()}&min=${min||1000}&max=${max||3000}   `).then(res =>{
    console.log(res)
   })
   reFetch();
  
 }

  
  return (
    <div> 
      <p   style={{
            color: "blue",
            backgroundColor: "#003580",
            height: 15 ,
            position:"fixed",
           width:"100vw",
           display: "block"

        }}></p>  
      <Navbar/>

     {/* <Header type="list"/>  */}
   
     <div className="listContainer">
        
      <div className="listWrapper">
        <div className="listSearch">
          <h1 className='lsTitle'>Search</h1>
          <div className="lsItem">
            <label>Destination</label>
            <input type="text"  placeholder={destination}/>
          </div>
          <div className="lsItem">
            <label>Check-in Date</label>
            <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0]?.startDate , "dd/MM/yyyy")} to ${format(dates[0]?.endDate , "dd/MM/yyyy")}`}</span>
          { openDate && ( <DateRange
            onChange={(item)=>setDates([item.selection])}
            ranges={dates}
            minDate={new Date()}
            />)}
          
          </div>
          <div className="lsItem">
            <label>Options</label>
            <div className="lsOptions">
            <div className="lsOptionItem">
           

            </div>
            <div className="lsOptionItem">
              <span className= 'lsOptionText'>
                Min price <small>per night</small>
              </span>

              <input type="number"    onChange={e=>setMin(e.target.value)} className="lsOptionInput" />

            </div>
            <div className="lsOptionItem">
              <span className= 'lsOptionText'>
                Max price  <small>per night</small>
              </span>
              <input type="number"  onChange={e=>setMax(e.target.value)} className="lsOptionInput" />

            </div>
            <div className="lsOptionItem">
              <span className= 'lsOptionText'>
                Adult 
              </span>
              <input type="number"   min={1} className="lsOptionInput"  placeholder={options.adult}/>

            </div>
            <div className="lsOptionItem">
              <span className= 'lsOptionText'>
              Children
              </span>
              <input type="number"   min={0} className="lsOptionInput"  placeholder={options.children} />

            </div>
            <div className="lsOptionItem">
              <span className= 'lsOptionText'>
              Room
              </span>
              <input type="number"  min={1}className="lsOptionInput"    placeholder={options.room}/>

            </div>
          </div>
          

        
        
        
        </div>
        <button onClick={searchbox}>Search</button>
          </div>

        <div className="listResult">
          {loading?        <div   style={{width:"50%" ,marginLeft:"auto",marginRight:"auto"}   }>
<Lottie  animationData={load}      />

</div>:<>
          {data&&data.length>0?data.map(item =>(
          
          <SearchItem item={item} key={item._id} />
          )):
            <div   style={{width:"80%" ,marginLeft:"auto",marginRight:"auto"}   }>
            <Lottie  animationData={nodata}      />
            
            </div>
          
          
          }
          </>
         }
          
 
          

     


        </div>
      </div>
     </div>
     
     
      </div>
  )
}

export default List
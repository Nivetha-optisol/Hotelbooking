import React from 'react'
import { Link } from 'react-router-dom'
import "./searchItem.css"
 const SearchItem = ({item}) => {
  return (
   item ? ( <div className="searchItem">
     
   <img
     src={item && item.photos[0]}
     alt=""
     className="siImg"
   />
   <div className="siDesc">
     <h1 className="siTitle">{item.name}</h1>
     <span className="siDistance">{item.distance}m from center</span>
   
     
     <span className="siFeatures">
      {item.desc}
     </span>
     
    
   </div>
   <div className="siDetails">
     {item.rating && <div className="siRating">
       <span>Excellent</span>
       {/* <button>{item.rating}</button> */}
     </div>}
     <div className="siDetailTexts">
       <span className="siPrice">&#8377;{item.cheapestPrice}</span>
     <Link to={`${item._id}`}>
       <button className="siCheckButton">See availability</button>
       </Link>
     </div>
   </div>
 </div>)
  :(<div><h1>No Hotels Found</h1></div>))
}

export default SearchItem

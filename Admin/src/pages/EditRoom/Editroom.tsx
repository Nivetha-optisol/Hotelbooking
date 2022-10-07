import React, { useEffect } from 'react'
import "./editRoom.css"

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs, roomInputs } from "../../formSource";
import useFetch, { api } from "../../hooks/useFetch";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const[gethotel , setGethotel]=useState<any>([]);
  const navigate=useNavigate();
  const location =useLocation();
  const path = location.pathname.split("/")[1];
  const currentId:any = location.state
  console.log("id",currentId.data)
  const { data, loading, error } =
    useFetch(`http://localhost:8005/api/${path}/${currentId.data}`) 

console.log(roomInputs)


  useEffect(() => {
    const fetchData = async () => {
    
      try {
        const res = await api.get("/hotels");
        console.log(res.data)
        setGethotel(res.data)
      } catch (err) {
      
      }
     
    };
    fetchData();
  }, []);
 



  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // @ts-expect-error
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.put(`http://localhost:8005/api/rooms/${currentId.data}`, { ...info, roomNumbers }    , {headers:{isAdmin:localStorage.getItem(`user`)}});
         navigate("/rooms")
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
      
        <div className="top">
          <h1>{data?._id} Update room </h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                 
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    defaultValue={data&&data[input.id]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                // @ts-expect-error
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder={data&& data.roomNumbers.map((roomNumbers)=>(
                    roomNumbers.number)
                  )}                  
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : gethotel &&
                    gethotel?.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
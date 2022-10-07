import "./edithotel.css"

import Sidebar from "../../components/sidebar/Sidebar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch, { api } from "../../hooks/useFetch";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const NewHotel = () => {
  const [files, setFiles] = useState();
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [fetchrooms , setFetchrooms]=useState<any>([]);

  const navigate=useNavigate();
  const location =useLocation();
  const path = location.pathname.split("/")[1];
  const currentId:any = location.state
  console.log("id",currentId.data)
  const { data, loading, error } = useFetch(`http://localhost:8005/api/${path}/${currentId.data}`);
  console.log(data)

  const [isFile,setIsFile] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
    
      try {
        const res = await api.get("/rooms");
        console.log(res.data)
        setFetchrooms(res.data)
      } catch (err) {
      
      }
     
    };
    fetchData();
  }, []);


  
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setIsFile(false)
  };


 


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if(!isFile){
        const list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
             // @ts-expect-error
            data.append("file", file);
            data.append("upload_preset", "qqwgak9b");
            const uploadRes = await axios.put(
              "https://api.cloudinary.com/v1_1/dyhxtfvnd/image/upload",
              data
            );
  
            const { url } = uploadRes.data;
            return url;
          })
        );
  
        const newhotel = {
          ...info,
          rooms,
          photos: list,
        };
  
        await axios.put(`http://localhost:8005/api/${path}/${currentId.data}`, newhotel  ,{headers:{isAdmin:localStorage.getItem(`user`)}} );
      }else{
        const newhotel = {
          ...info,
          rooms,
        };
  
       await axios.put(`http://localhost:8005/api/${path}/${currentId.data}`, newhotel  ,{headers:{isAdmin:localStorage.getItem(`user`)}} );
      }
    } catch (err) {console.log(err)}
    navigate("/hotels")


  };
  
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
       // @ts-expect-error
      (option) => option.value
    );
    setRooms(value);
  };
  const fileUpload =(e)=>{
    if(e.target.files){
      setFiles(e.target.files)
      setIsFile(true)
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
      
        <div className="top">
          <h1>{data?._id}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : data?.photos&&data?.photos[0]
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) =>fileUpload(e)}
                  style={{ display: "none" }}
                />
              </div>

              {data && hotelInputs.map((input) => (
                <div className="formInput"  key={input.id}>
                  
                  <input
                  // style={{border:"1px solid red"}}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    defaultValue={data[input.id]}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
              {/*   @ts-expect-error */}
                  <option value={false}>No</option>
                  {/*  @ts-expect-error */}
                  <option value={true}>Yes</option>
                </select>
              </div>
            


{/* 
<div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : fetchrooms &&
                      fetchrooms?.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div> */}
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
        
        <div className="image_grid" style={{width:"50%", marginLeft:"55px"}}>
          <div className="images" style={{position:"relative", display:"inline-block", padding:"10px"}}><img src={
                files
                  ? URL.createObjectURL(files[1])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              } style={{width:"50px", height:"50px"}}></img>
          </div>
          <div className="images" style={{position:"relative", display:"inline-block", padding:"10px"}}><img src={
                files
                  ? URL.createObjectURL(files[2])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              } style={{width:"50px", height:"50px"}}></img>
          </div>
          <div className="images" style={{position:"relative", display:"inline-block", padding:"10px"}}><img src={
                files
                  ? URL.createObjectURL(files[3])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              } style={{width:"50px", height:"50px"}}></img>
          </div>
            
            
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
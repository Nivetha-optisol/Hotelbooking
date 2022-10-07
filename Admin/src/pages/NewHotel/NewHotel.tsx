import "./newHotel.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const NewHotel = () => {
  const [files, setFiles] = useState();
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
const navigate=useNavigate();
  const { data, loading, error } = useFetch("http://localhost:8005/api/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
       // @ts-expect-error
      (option) => option.value
    );
    setRooms(value);
  };
  console.log(info);
  console.log(rooms);
  console.log(files);


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
           // @ts-expect-error
          data.append("file", file);
          data.append("upload_preset", "qqwgak9b");
          const uploadRes = await axios.post(
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

      await axios.post("http://localhost:8005/api/hotels", newhotel ,{headers:{isAdmin:localStorage.getItem(`user`)}}   );
    } catch (err) {console.log(err)}
    navigate("/hotels")
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
      
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                   // @ts-expect-error
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
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
             


              <button onClick={handleClick}>Send</button>
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
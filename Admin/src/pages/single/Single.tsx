import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Single = ({ inputs, title }) => {
  const [file, setFile] = useState();
  const [info, setInfo] = useState({});
  const navigate=useNavigate();
  const location =useLocation();
  const path = location.pathname.split("/")[1];
  const currentId:any = location.state
  console.log("id",currentId.data)
  const { data, loading, error } = useFetch(`http://localhost:8005/api/${path}/${currentId.data}`);
console.log(data)
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
   console.log("hello");
   const data  = new FormData();
    data.append("file", file);
    data.append("upload_preset", "qqwgak9b");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dyhxtfvnd/image/upload",
        data
      
      )

      const { url } = uploadRes.data;
console.log(url)
      const newUser = {
        ...info,
        img: url,
      };

      await axios.put(`http://localhost:8005/api/${path}/${currentId.data}`, newUser    , {headers:{isAdmin:localStorage.getItem(`user`)}});
   navigate("/users");


    } catch (err) {
      console.log(err);
    }
   console.log(info);
   console.log(file);
  };

 
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>{data?._id}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : data?.img
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
                   // @ts-expect-error
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {data && inputs.map((input) => (
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
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
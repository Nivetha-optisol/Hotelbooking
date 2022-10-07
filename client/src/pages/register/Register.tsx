


import "./register.css";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import userEvent from "@testing-library/user-event";



const Register = ({ inputs, title }) => {
  const [file, setFile] = useState();
  const [info, setInfo] = useState({});
  const navigate = useNavigate()
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
   
    const data = new FormData();
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
      

        const res = await axios.post("http://localhost:8005/api/auth/register", newUser   , {headers:{isAdmin:localStorage.getItem(`user`)}});
        console.log(res);
        if(res.data.isexist){
          toast.error(res.data.message)
          return
        }
               

        // toast(res.data.message)
        // if(!res.data.isVerified)
        // {
        //   toast("lololA")
        // }

    } catch (err) {
      
     toast(err.response.data.message);
     console.log(err.response.data);
     
    }
 
  };

  console.log(info);
  return (
    <div className="register">

    <div className="registerContainer">
      {/* <Navbar /> */}
      <div className="regtop">
       
      </div>
      <div className="regbottom">
        <div className="regleft">
          <img className="regimg"
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        </div>
        <div className="regright">
          <form className="regform">
            <div className="regformInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="regicon" />
              </label>
              <input className="reginput"
                type="file"
                id="file"
                 // @ts-expect-error
                onChange={(e) => setFile(e.target.files[0])}
               
                style={{ display: "none" }}
              />
            </div>

            {inputs.map((input) => (
              <div className="regformInput"  key={input.id}>
              <label className="reglabel">{input.label}</label>
                <input className="reginput"
               
                  onChange={handleChange}
                  type={input.type}
                  
                  placeholder={input.placeholder}

                  id={input.id}
                />
              </div>
            ))}
            <button className="regbutton" onClick={handleClick}>Register Now</button>
          <Link to ="/login">  <button className="regbutton" >Login</button></Link>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register

import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./login.css";

const Login = () => {

const[ credentials  ,setCredentials]=useState({
    username :undefined ,
    password : undefined ,
});


const{user ,loading ,error ,dispatch} = useContext(AuthContext);

const navigate = useNavigate()
    const handleChange=(e)=>{

        setCredentials((prev) =>({...prev ,[e.target.id]:e.target.value}));
    }
    const handleClick = async(e) =>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        
                try{
const  res = await axios.post("http://localhost:8005/api/auth/login" ,credentials)
if(res.data.isAdmin){
    dispatch({type:"LOGIN_SUCCESS" ,  payload:res.data.details});
    localStorage.setItem("isAdmin" ,res.data.isAdmin)
    localStorage.setItem("acess_token" ,res.data.token)
navigate("/")
}
else {
    dispatch({type:"LOGIN_FAILURE"  ,  payload:"You are not allowed"})
}


                }
                catch(err){
dispatch({type:"LOGIN_FAILURE"  ,  payload:err.response.data})
                }
    };
    console.log("userrrr",user);
    console.log("user" ,user?.username);
  return (
    <div className="login">
      <div className="lContainer">
  
        <input
          type="text" placeholder="username" id="username"onChange={handleChange} className="lInput" />
        <input type="password" placeholder="password" id="password" onChange={handleChange}  className="lInput"  />
        <button   disabled ={loading} onClick={handleClick} className="lButton">  Login</button>
       
        {error &&   <span>{error.message}</span>}
        
      </div>
    </div>
  );
  
}

export default Login
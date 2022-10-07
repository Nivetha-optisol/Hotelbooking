import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {GoogleLogin ,GoogleLogout} from 'react-google-login'
import { AuthContext } from '../../context/AuthContext';
import "./login.css";
import login from "./login.json"
import Lottie from 'lottie-react'
import {gapi} from 'gapi-script'
const Login = () => {

const[ credentials  ,setCredentials]=useState({
    username :undefined ,
    password : undefined ,
});

const [showLoginButton ,setShowLoginButton]=useState(true);
const [showLogoutButton ,setShowLogoutButton]=useState(false);



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
dispatch({type:"LOGIN_SUCCESS" ,  payload:res.data.details});
   console.log( "Hello" ,res)
   localStorage.setItem("isAdmin" ,res.data.isAdmin)
   localStorage.setItem("acess_token" ,res.data.token)
navigate("/")

                }
                catch(err){
dispatch({type:"LOGIN_FAILURE"  ,  payload:err.response.data})
                }
    };
    console.log("userrrr",user);
    console.log("user" ,user?.username);
//google sign in
const  clientId="727656018338-83p9tgi0c15s2vo06p9esv7t1uld72b7.apps.googleusercontent.com";
    const onLoginSuccess = async (res) => {
      console.log("LoginSucess",res.profileObj);
     
      const  ress =  await axios.post("http://localhost:8005/api/auth/googleLogin",res.profileObj)
    
      dispatch({type:"LOGIN_SUCCESS" ,  payload:ress.data});
      setShowLoginButton(false);
      setShowLogoutButton(true);
      navigate("/")

    }
    const onLoginFailure = (res) => {
      console.log("Login Failed" ,res);
    }
    const onLogout=()=>{

 alert("Signed out ");
 setShowLoginButton(true);
 setShowLogoutButton(false);
 
    }

    // google api
    useEffect(()=>{

      function start(){

      gapi.client.init({

          clientId:clientId,

          scope:"profile"

      })

  }

  gapi.load('client:auth2',start)

  })
  return (
    <div className="login">
    {  showLoginButton ?<GoogleLogin  className='google'
    clientId={ clientId}
    buttonText="Login"
    onSuccess={onLoginSuccess}
    onFailure={onLoginFailure}
    cookiePolicy={'single_host_origin'}
  />: loading}
{showLogoutButton?
<GoogleLogout   
      clientId={ clientId}
      buttonText="Logout"
      onLogoutSuccess={onLogout}
    />:null  }
   
   <Lottie  animationData={login}  style={{width:400 , position:"absolute",left:100 } } />

      <div className="lContainer">
        <input
          type="text" placeholder="username" id="username"onChange={handleChange} className="lInput" />
        <input type="password" placeholder="password" id="password" onChange={handleChange}  className="lInput"  />
        <button   disabled ={loading} onClick={handleClick} className="lButton">  Login</button>
        <div>
      <Link to ="/register" > <button style={{width:"50%"}}  className="lButton"> Register Here</button></Link>
        {error &&   <span>{error.message}</span>}
        <Link to ="/forget" > <button  style={{width:"48.9%"}} className="lButton">Forgot Password</button></Link>
        </div>
      </div>
    </div>
  );
  
}

export default Login
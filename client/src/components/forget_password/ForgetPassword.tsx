import axios from 'axios';
import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./forgetpassword.css"

const ForgotPassword = ({show,setShow}) => {
    const [formData,setFormData] = useState({
        email:"",code:"",password:""
    }) 

    const navigate = useNavigate();
    const handleClick = () =>{   
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
      await axios.post("http://localhost:8005/api/auth/vpm",formData)
      await navigate("/cpass")
    }
    const handleChange = (e:any) =>{
      setFormData({...formData,[e.target.name]:e.target.value}) 
      setShow({...formData,[e.target.name]:e.target.value}) 
      console.log(show);
      
  }
  return (
    <div   className='fpass' >
       <Link to="/login"> <span className='backtologin'>Back to Login Page</span></Link>
    <div className='lContainer'>
   
        {<form onSubmit={handleSubmit} autoComplete="off">
        <input className="sinput" type="email" name='email' placeholder='Please enter your Email Address' onChange={handleChange}  required/>
        <button type="submit" className="sbutton" onClick={handleClick}>Submit</button>
        </form>
      }
                                     
    </div>

    </div>
  )
}

export default ForgotPassword
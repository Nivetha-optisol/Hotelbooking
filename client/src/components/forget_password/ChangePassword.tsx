import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./changepassword.css"
const ChangePassword = ({show,setShow}) => {

  
    const [formData,setFormData] = useState({
        email:show?.email,code:"",password:""
    }) 
 
    console.log(show?.email);
    
    const navigate = useNavigate();
   
 
const ChangepasswordHandle = async (e) =>{ 
    e.preventDefault()
    await axios.post("http://localhost:8005/api/auth/changepassword",formData)
  console.log(formData);
navigate("/")
 
}

const handleChange = (e:any) =>{
    setFormData({...formData,[e.target.name]:e.target.value}) 
    setShow({...formData,[e.target.name]:e.target.value}) 
    console.log(show);
    
}

  return (
    <div  className='backtopage' >
            <Link to="/login"   > Back to Login Page</Link>
       <div>
      <form className='container' onSubmit={ChangepasswordHandle} autoComplete="off">
        <input type="email" name='email' className="einput"  value={show?.email} disabled 
      
        placeholder='Email'/><br></br>
          <input type="password" name="password"  className="pinput"   placeholder='Password' onChange={handleChange}/><br></br>
                 
          <input type="text" name="code" placeholder='OTP'   className='oinput' onChange={handleChange}/>
          
          <button type='submit' className="submitb">Change Password</button>
        </form>
    </div>
    </div>
  )
}

export default ChangePassword
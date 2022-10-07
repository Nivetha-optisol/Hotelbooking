import React, { useContext, useState } from 'react';

import {BrowserRouter , Routes ,Route, Navigate} from "react-router-dom" ;
import ChangePassword from './components/forget_password/ChangePassword';
import ForgotPassword from './components/forget_password/ForgetPassword';
import Failure from './components/paynow/Failure';

import Paynow from './components/paynow/Paynow';
import Success from './components/paynow/Success';

import { AuthContext } from './context/AuthContext';
import { userInputs } from './formSource';

import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/login/Login';
import Register from './pages/register/Register';








function App() {
  const {user}=useContext(AuthContext)
const [show,setShow] = useState()
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<List/>}/>
      <Route path="/hotels/:id" element={<Hotel/>}/>
      <Route path="/login" element={!user?<Login/>:<Navigate to="/"></Navigate>}/>
      <Route path="/register" element={<Register inputs={userInputs} title="Add New User" />}/>
      <Route path="/success" element={<Success/>}/>
      <Route path="/failure" element={<Failure/>}/>
      <Route path="/payment" element={<Paynow/>}/>

      <Route path="/forget" element={<ForgotPassword show={show} setShow={setShow}/>}/>
      <Route path="/cpass" element={<ChangePassword show={show} setShow={setShow}/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;

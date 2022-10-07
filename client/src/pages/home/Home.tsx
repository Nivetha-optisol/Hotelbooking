import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import Star from '../../components/star/Star'
import { AuthContext } from '../../context/AuthContext'

import  "./home.css"
const Home = () => {
  const navigate = useNavigate()
  const {user}=useContext(AuthContext)
  console.log("Hello_user" , user);
  return (
    <div>
       <Navbar/>
       <Header type={undefined}/> 
       <div className="homeContainer">
       
       
       

       
        <h1 className="homeTitle">Top Places</h1>
        <FeaturedProperties/>
  
      
        <MailList/>
        

       </div> 

       

    </div>
  )
}

export default Home
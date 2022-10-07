import React, { useEffect } from 'react'
import success from "./success.json"

import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom'
const Success = () => {

  const navigate = useNavigate()
  useEffect(() => {

    setTimeout(() => {

      navigate('/')

    }, 2500)

  }, [])
  return (

<>

<div   style={{width:"40%" ,marginLeft:"auto",marginRight:"auto"}   }>
<Lottie  animationData={success}      />

</div>
</>



  )
}

export default Success
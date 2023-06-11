import React,{useEffect, useState} from 'react'
import Navbar from './components/Navbar'

const App = (props) =>{
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const handleIsLoggedIn =() =>{
    setIsLoggedIn(!isLoggedIn)
  }

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
      if(token){
        handleIsLoggedIn()
      } 
  },[])

  return (      
    <div
      style={{height:"100vh"}}>   
        <Navbar
            handleIsLoggedIn={handleIsLoggedIn}
            isLoggedIn={isLoggedIn}
        />
    </div>
  )
}

export default App
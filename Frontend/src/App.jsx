//import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showlogin, setShowLogin] = useState(false)

  return (
    <>
      {showlogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
       <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/cart' element={<Cart/>}/>
        <Route path = '/order' element={<PlaceOrder/>}/>
        <Route path = '/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
   
  )
}

export default App

//import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContect'

// eslint-disable-next-line react/prop-types
const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("");
  const {getTotalCartAmount, token, setToken} = useContext(StoreContext)
  const navigate = useNavigate()
  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
        <a href='#footer' onClick={()=>setMenu("Contact-Us")} className={menu==="Contact-Us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?'':'dot'}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>SignIn</button>
        :<div className='navbar-profile'>
          <img src={assets.profile_icon}></img>
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon}></img><p>Orders</p></li>
            <hr/>
            <li onClick={logout}><img src={assets.logout_icon}></img><p>Logout</p></li>
          </ul>
        </div>}
    
      </div>
      
    </div>
    
  )
}

export default Navbar

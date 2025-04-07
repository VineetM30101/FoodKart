/* eslint-disable no-unused-vars */
//import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

// eslint-disable-next-line react/prop-types
const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore'>Explore our menu and order some delicious food to satisfy your cravings!</p>
        <div className="explore-menu-list">
            {menu_list.map((item, index) => {
                return (
                    // eslint-disable-next-line react/jsx-key
                    <div className='explore-menu-list-item' onClick={()=>setCategory(prev => prev === item.menu_name?"All":item.menu_name)}>
                        <img src= {item.menu_image} className={category===item.menu_name?"active":""}></img>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu

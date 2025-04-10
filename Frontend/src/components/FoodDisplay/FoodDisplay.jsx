//import React from 'react'

import { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContect'
import FoodItem from '../FoodItem/FoodItem'

// eslint-disable-next-line react/prop-types
const FoodDisplay = ({category}) => {

   
    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes recomended for you</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
         
          if(category ==="All" || category===item.category){
            console.log(item.category)
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
           
        })}
      </div>
    </div>
  )
}

export default FoodDisplay

//import React from 'react'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Header from '../../components/Header/Header'
import './Home.css'
import { useState } from 'react';

const Home = () => {

 
  const [category, setCategory] = useState("All");
  
  return (
    <div>
     
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home

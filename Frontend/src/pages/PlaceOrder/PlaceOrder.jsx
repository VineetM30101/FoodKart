//import React from 'react'
import { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContect'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount, url, token, food_list, cartItems} = useContext(StoreContext)
  const [data, setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
   
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+5
    }
    let response = await axios.post(url+'/api/order/place', orderData,{headers:{token}})
    if(response.data.success){
      setData({
        firstname:"",
        lastname:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
      })
      alert("Ordered will be delivered soon!")
    }
    else{
      alert("Error")
    } 
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstname' onChange={onChangeHandler} value={data.firstname} type='text' placeholder='First name'/>
          <input required name='lastname' onChange={onChangeHandler} value={data.lastname} type='text' placeholder='Last name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zipcode'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:5}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+5}</b>
            </div>
            <button type='submit' >Pay(Cash on Delivery)</button>
          </div>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder

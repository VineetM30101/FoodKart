import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import stripe from 'stripe'

/*
const stripe = new Stripe(process.env.Stripe_Seecret_Key)
*/

//placing user oder from frontend
const placeOrder = async (req,res)=>{
    const frontend_url = "http://localhost:5174"
    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
       
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});
        res.json({success:true, message: "Done"})
    } catch(error){
        console.log(error)
        res.json({success:false, message:error})
    }
}


//user orders for frontend
const userOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success: true, data: orders})
    } catch (error) {
        res.json({success: false, message:error});
    }
}

//listing orders for admin panel
const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders})
    } catch (error) {
        res.json({success: false, message:error})
    }
}

//api for updating order status 
const updateStatus = async (req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success: true, message: "Status Updated"})
    }
    catch(err){
        console.log(err)
        res.json({success:false, message: error})
    }
}

export {placeOrder, userOrders, listOrders, updateStatus}
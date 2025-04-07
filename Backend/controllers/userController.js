import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async(req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User doesnot exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid input"})
        }

        const token = createToken(user._id);
        res.json({success:true, token})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//send that token to res to the user
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register User / SignUp
const registerUser = async (req,res) => {
    const {name, password, email} = req.body;
    //checking if user already exist
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false,message:"User already exist"})
        }
        //validating email format and strong password

        if(!validator.isEmail(email)){
            return res.json({success: false,message:"Please Enter valid eamil"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please Enter strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10) //ensuring that even if two users have the same password, their hashed passwords will be different due to the unique salts.
        const hashedPassword = await bcrypt.hash(password,salt) 

        const newUser = new userModel({
            name:name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true, token})


    }
    catch(err){
        console.log(err);
        res.json({success:false, message:"Error"})
    }
}

export {loginUser,registerUser}
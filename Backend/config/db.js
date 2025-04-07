import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Vineet:Vineet30_Atlas@cluster0.7tsdu.mongodb.net/Foodkart').then(()=>console.log("DB connected"))
}
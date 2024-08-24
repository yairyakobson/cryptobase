import "colors"
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();  // Ensure dotenv is loadeed

export const connectDB = async() =>{
  const connect = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline);
}
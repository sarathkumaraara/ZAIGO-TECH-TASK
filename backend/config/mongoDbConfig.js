import mongoose from "mongoose";

const connectDB = async() => {
  try{
    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_DEV  ||  "mongodb://localhost:27017/"
    await mongoose.connect(DB_CONNECTION_STRING,{
      dbName: process.env.DB_NAME || "task_management"
    })
  }
  catch(error){
    console.error("DB connection error")
    process.exit(1)
  }
}

export default connectDB

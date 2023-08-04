import mongoose from "mongoose";


export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'user',
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
    } catch (error) {
        console.error(error);
    }
}
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { connectDB } from "@/libs/database";
import User from "@/models/User";

export const POST = async (req,res) =>{
    const {username, email,password} = await req.json();

    try {
        await connectDB();
        
        // check if user exist
        const userExist = await User.findOne({email:email})
        
        if(!userExist){
            const hashedpassword = await bcrypt.hash(password,10);

            const res = await User.create({
                username:username,
                email:email,
                password:hashedpassword
            })
         return NextResponse.json(res,{status:200})
        }
        return NextResponse.json({message:"User already exists..!"},{status:422})
    } catch (error) {
        console.error(error);
    }
}
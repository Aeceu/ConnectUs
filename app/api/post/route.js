import { connectDB } from "@/libs/database";
import Posts from "@/models/Post";
import { NextResponse } from "next/server";

export const GET = async (req,res)=>{
    try {
        await connectDB();
        const posts = await Posts.find({}).populate('creator');
        return NextResponse.json(posts,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Failed to fetch all data ",status:500})
    }
}
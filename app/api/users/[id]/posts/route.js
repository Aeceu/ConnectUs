import { connectDB } from "@/libs/database";
import Posts from "@/models/Post";
import { NextResponse } from "next/server";

export const GET = async (req,{params})=>{
    try {
        await connectDB();
        const posts = await Posts.find({creator:params.id}).populate('creator');
        return NextResponse.json(posts,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Failed to fetch all data ",status:500})
    }
}
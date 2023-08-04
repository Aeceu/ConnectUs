import { connectDB } from "@/libs/database";
import Posts from "@/models/Post";
import { NextResponse } from "next/server";

export const POST = async (req,res)=>{
    const {userID,post,tag} = await req.json();
    try {
        await connectDB();
        const newPost = await Posts({
            creator:userID,
            post:post,
            tag:tag
        })
        await newPost.save();
        return NextResponse.json(newPost,{status:201})
    } catch (error) {
        return NextResponse.json({message:"Failed to create a new post!",status:500})
    }
}
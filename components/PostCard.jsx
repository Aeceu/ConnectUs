"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const getDate = (date) => {
    const newDate = date.split("T")[0];
    return newDate;
  };

  const handleLikes = () => {
    setLikes((prev) => prev + 1);
  };
  return (
    <div className="w-[400px] flex flex-col p-2 bg-slate-800  rounded-md text-white">
      <div className="border-[1px] border-slate-500 rounded-t-md px-4 pt-4">
        {/* PostCard Header */}
        <div className="flex items-center gap-2">
          {post.creator.image ? (
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full"
              blurDataURL="blur"
            />
          ) : (
            <div className="w-[40px] h-[40px] rounded-full bg-white"></div>
          )}
          <span className="w-full">
            <h1>{post.creator.username}</h1>
            <p className="text-[.7rem] text-slate-300">
              {getDate(post.createdAt)}
            </p>
          </span>

          {/* Display this if we are in the /profile */}
          {session?.id === post.creator._id && pathname === "/profile" && (
            <div className="flex flex-col  items-center">
              <Image
                className="text-white cursor-pointer relative"
                src="./edit.svg"
                width={20}
                height={20}
                alt="edit-logo"
                onClick={() => setToggle((prev) => !prev)}
              />
              {toggle && (
                <div className="bg-white p-2 absolute flex flex-col items-end mt-5  rounded-md text-black text-sm">
                  <button type="button">Edit</button>
                  <button type="button">Delete</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* This is where post and tag is displayed */}
        <div className="py-2">
          <h1>{post.post}</h1>
          <br />
          <h1 className="text-blue-500">{post.tag}</h1>
        </div>

        {/* Displays the total likes and comments */}
        <div className="w-full flex  justify-between items-center text-sm text-slate-300">
          <span>{likes} Likes</span>
          <span>0 Comment</span>
        </div>
      </div>

      {/* Comment and Like button */}
      <div className="flex justify-between items-center  border-[1px] border-slate-500 rounded-b-md">
        <button onClick={handleLikes} type="button" className="w-full py-2">
          Like
        </button>
        <button type="button" className="w-full border-x-[1px] py-2">
          Comment
        </button>
      </div>
    </div>
  );
};

export default PostCard;

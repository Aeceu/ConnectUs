"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";
import CreatePost from "./CreatePost";
import Image from "next/image";

const ProfileFeed = () => {
  const { data: session } = useSession();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/${session?.id}/posts`);
      const res = await response.json();
      setDatas(res);
      setLoading((prev) => !prev);
    };
    if (session?.id) fetchData();
  }, [session?.id]);

  if (loading) {
    return (
      <p className="text-white w-full text-center text-2xl ">Loading....</p>
    );
  }
  return (
    <>
      {/* Profile header */}
      <div className="w-[700px] bg-slate-800 p-4 rounded-b-md shadow-lg">
        <div className="flex gap-4 items-center">
          {session?.user?.image ? (
            <Image
              src={session?.user.image}
              alt="user_image"
              width={70}
              height={70}
              className="rounded-full"
              blurDataURL="blur"
              priority
            />
          ) : (
            <div className="w-[70px] h-[70px] rounded-full bg-white"></div>
          )}
          <h1 className="text-5xl text-white my-8">My Profile</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white ">
            <h1 className="text-2xl">{session?.user?.name}</h1>
            <h3 className="text-[.7rem] text-slate-300">
              {session?.user.email}
            </h3>
          </span>
        </div>
      </div>

      {/* Create post div */}
      <div className="w-full flex flex-col gap-4 items-center">
        <CreatePost />
      </div>

      <div className="w-full flex flex-col-reverse gap-4 items-center py-4">
        {datas.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </div>
    </>
  );
};

export default ProfileFeed;

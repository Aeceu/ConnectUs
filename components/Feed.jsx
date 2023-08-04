"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";

const Feed = () => {
  const { data: session } = useSession();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/post");
      const response = await res.json();
      setDatas(response);
      setLoading((prev) => !prev);
    };
    if (session) fetchData();
  }, [session]);

  if (loading) {
    return (
      <p className="text-white w-full text-center text-2xl ">Loading....</p>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-4">
      {datas.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </div>
  );
};

export default Feed;

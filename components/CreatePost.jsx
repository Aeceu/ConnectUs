"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreatePost = () => {
  const [togglePost, setTogglePost] = useState(false);
  const [data, setData] = useState({ post: "", tag: "" });
  const { data: session } = useSession();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("api/post/new", {
        method: "POST",
        body: JSON.stringify({
          userID: session?.id,
          post: data.post,
          tag: data.tag,
        }),
      });
      setData({ post: "", tag: "" });
      setTogglePost((prev) => !prev);
      alert("Post created!");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div
        onClick={() => setTogglePost((prev) => !prev)}
        className={`bg-slate-800 w-[400px] rounded-md gap-4 p-4 ${
          togglePost ? "hidden" : "flex"
        } flex-col cursor-pointer hover:bg-slate-700 shadow-lg`}
      >
        <div className="w-full flex gap-4">
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-[40px] h-[40px] rounded-full bg-white"></div>
          )}
          <div className="text-white flex items-center">
            <h1 className="font-bold">{session?.user.name}</h1>
          </div>
        </div>
        <div className="w-full">
          <input
            onChange={() => setTogglePost((prev) => !prev)}
            type="text"
            placeholder="post something..."
            readOnly
            className="w-full bg-transparent border-2 rounded-md px-2 py-1 outline-none text-white "
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`w-[400px] ${
          togglePost ? "flex" : "hidden"
        } flex-col items-end gap-4 p-4 bg-slate-800 rounded-md shadow-lg`}
      >
        <div className="w-full flex gap-4">
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt="user_image"
              width={50}
              height={50}
              className="rounded-full"
              blurDataURL="blur"
            />
          ) : (
            <div className="w-[40px] h-[40px] rounded-full bg-white"></div>
          )}
          <div className="text-white">
            <h1>{session?.user.name}</h1>
            <h1>{session?.user.email}</h1>
          </div>
        </div>
        <div className="w-full">
          <textarea
            rows="5"
            placeholder="What to post?"
            className="w-full bg-transparent border-2 rounded-md px-2 py-1 outline-none text-white "
            value={data.post}
            onChange={(e) => setData({ ...data, post: e.target.value })}
          />
          <input
            type="text"
            placeholder="tag (#code, #webdev)"
            className="w-full bg-transparent border-2 rounded-md px-2 py-1 outline-none text-white "
            value={data.tag}
            onChange={(e) => setData({ ...data, tag: e.target.value })}
          />
        </div>
        <div className="flex ">
          <h1
            onClick={() => setTogglePost((prev) => !prev)}
            className="w-max text-white  rounded-full py-2 px-4 cursor-pointer"
          >
            Cancel
          </h1>
          <button
            type="submit"
            className="w-max text-white bg-black rounded-full py-2 px-4"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

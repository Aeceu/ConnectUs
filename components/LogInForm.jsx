"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogInForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showpass, setShowPass] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
    console.log("status: :", status);
    if (status.ok) router.push(status.url);
  };

  return (
    <div className="w-full flex flex-col gap-2 p-8 rounded-md shadow-lg bg-slate-800">
      <h1 className="w-full text-center text-2xl  text-white mb-8 ">
        Log in to your account
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <input
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="text"
          name="email"
          className="rounded-full px-4 py-2 outline-none mb-8"
          placeholder="Email"
        />
        <div className="rounded-full px-4 py-2 bg-white mb-4">
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type={showpass ? "text" : "password"}
            name="password"
            placeholder="password"
            className=" outline-none"
          />
          <span
            onClick={() => setShowPass((prev) => !prev)}
            className="text-gray-600 text-sm cursor-pointer"
          >
            show
          </span>
        </div>
        <Link
          href="/Sign-up"
          className="w-full text-end  text-blue-600 text-sm hover:text-blue-700"
        >
          create an accout
        </Link>
        <button
          type="submit"
          className="text-white rounded-full bg-blue-600 py-2 hover:bg-blue-700 my-4"
        >
          Log in
        </button>
      </form>
      <div className="flex gap-2  justify-center items-center">
        <span className="w-full border-b-[1px] h-0"></span>
        <span className="w-max text-sm text-gray-500 text-center">or</span>
        <span className="w-full border-b-[1px] h-0"></span>
      </div>
      <div className="w-full rounded-md flex  ">
        <span className="w-1/4 bg-white rounded-l-md"></span>
        <button
          type="button"
          className="w-3/4 bg-black py-3 rounded-r-md text-white"
        >
          Continue with Github
        </button>
      </div>
      <div className="w-full rounded-md flex  ">
        <span className="w-1/4 bg-white rounded-l-md"></span>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          type="button"
          className="w-3/4 bg-blue-600 py-3 rounded-r-md text-white"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LogInForm;

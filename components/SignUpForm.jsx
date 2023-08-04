"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [showpass, setShowPass] = useState(false);
  const [showrepass, setShowRePass] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.repassword) {
      return alert("password is incorrect");
    }
    try {
      await fetch("api/register", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });
      setData({
        username: "",
        email: "",
        password: "",
        repassword: "",
      });
      alert("Authentication success!");
      router.push("/Log-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 p-8 rounded-md shadow-lg bg-slate-800">
      <h1 className="w-full text-center text-2xl  text-white mb-8 ">
        Sign up a new account
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <input
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          type="text"
          name="username"
          className="rounded-full px-4 py-2 outline-none mb-8"
          placeholder="username"
        />
        <input
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="text"
          name="email"
          className="rounded-full px-4 py-2 outline-none mb-8"
          placeholder="Email"
        />

        <div className="rounded-full px-4 py-2 bg-white mb-8">
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
            {showpass ? "hide" : "show"}
          </span>
        </div>

        <div className="rounded-full px-4 py-2 bg-white mb-4">
          <input
            value={data.repassword}
            onChange={(e) => setData({ ...data, repassword: e.target.value })}
            type={showrepass ? "text" : "password"}
            name="repassword"
            placeholder="retype password"
            className=" outline-none"
          />
          <span
            onClick={() => setShowRePass((prev) => !prev)}
            className="text-gray-600 text-sm cursor-pointer"
          >
            {showrepass ? "hide" : "show"}
          </span>
        </div>

        <button
          type="submit"
          className="text-white rounded-full bg-blue-600 py-2 hover:bg-blue-700 my-4"
        >
          Sign up
        </button>
      </form>
      <Link
        href="/Log-in"
        className="underline text-slate-400 w-full text-center text-sm"
      >
        Back to Log in
      </Link>
    </div>
  );
};

export default SignUpForm;

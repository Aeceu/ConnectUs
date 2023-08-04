"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SignOutBtn from "./SignOutBtn";

const NavBar = () => {
  const { data: session } = useSession();
  const [toggle, setToggle] = useState(false);
  if (session) {
    return (
      <div className="w-[700px] h-[100px] flex items-center justify-between py-8 px-8 bg-slate-800 shadow-lg  rounded-b-md">
        <Link href={"/"} className="flex gap-2 items-center text-white text-xl">
          <Image
            className="text-white"
            src="./home1.svg"
            width={30}
            height={30}
            alt="edit-logo"
          />
          Home
        </Link>
        <div className="flex flex-col items-end">
          {session?.user.image ? (
            <Image
              onClick={() => setToggle((prev) => !prev)}
              src={session?.user?.image}
              width={40}
              height={40}
              alt="user-logo"
              className="rounded-full relative cursor-pointer"
            />
          ) : (
            <div
              onClick={() => setToggle((prev) => !prev)}
              className="w-[40px] h-[40px] rounded-full bg-white cursor-pointer"
            ></div>
          )}
          {toggle && (
            <div className="bg-white p-2  absolute top-[80px] flex flex-col  rounded-md">
              <Link
                onClick={() => setToggle((prev) => !prev)}
                href={`/profile`}
                className="w-full text-end mb-4"
              >
                My Profile
              </Link>
              <SignOutBtn />
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default NavBar;

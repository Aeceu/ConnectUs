"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
const SignOutBtn = () => {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "/Log-in" })}
      className="bg-black text-white w-max px-4 py-1 rounded-md flex gap-2 cursor-pointer"
    >
      <h1 className="text-white text-md" type="button">
        Sign Out
      </h1>
      <Image src="./signout.svg" width={25} height={25} alt="logo" />
    </div>
  );
};

export default SignOutBtn;

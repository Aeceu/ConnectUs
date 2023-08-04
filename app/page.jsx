import Feed from "@/components/Feed";
import CreatePost from "@/components/CreatePost";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/Log-in");
  }
  return (
    <div className="w-[700px] flex flex-col text-white items-center px-4 py-8 ">
      <CreatePost />
      <br />
      <Feed />
    </div>
  );
};

export default page;

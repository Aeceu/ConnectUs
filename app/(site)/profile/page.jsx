import ProfileFeed from "@/components/ProfileFeed";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/Log-in");
  }
  return (
    <div className="flex flex-col justify-center gap-4 mt-4">
      <ProfileFeed />
    </div>
  );
};

export default page;

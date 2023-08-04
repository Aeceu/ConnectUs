import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogInForm from "@/components/LogInForm";
const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <LogInForm />;
    </div>
  );
};

export default page;

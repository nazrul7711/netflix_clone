import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res,nextAuthOptions);
  console.log(session);
  if (!session?.user?.email) {
    throw new Error("Not Signed In");
  }
  let user = await prismadb.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });
  if (!user) {
    throw new Error("No such user");
  }
  return user;
};
export default serverAuth;

import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb"

const serverAuth = async(req:NextApiRequest)=>{
  const session = await getServerSession(req)
  if(!session?.user?.email){
    throw new Error("Not Signed In")
  }
  let user = await prismadb.user.findUnique({
    where:{
      email:session?.user.email
    }
  })
  if(!user){
    throw new Error("No such user")
  }
  return user

}
export default serverAuth
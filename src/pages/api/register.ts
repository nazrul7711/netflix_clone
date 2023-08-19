import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import prismadb from "@/lib/prismadb"
import bcrypt from "bcrypt"

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  try{
    if (req.method !== "POST") {
      return res.status(400).json({msg:"its not a post request"})
    }
    let {email,name,password} = req.body
    let existingEmail = await prismadb.user.findUnique({
      where:{
        email
      }
    })
    if(existingEmail){
      return res.status(409).json({ msg: "User with this email already exist" });
    }
    let hashedPassword = await bcrypt.hash(password,12)
    let newUser = await prismadb.user.create({
      data:{
        name,
        email,
        emailVerified:new Date(),
        hashedPassword,
        image:""

      }
    })
    return res.status(200).json({user:newUser});
  }
  catch(error:any){
    console.log(error)
    return res.status(400).json({msg:error.message})
  }
  
};
export default handler;

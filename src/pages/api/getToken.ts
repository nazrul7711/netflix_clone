import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let secret= process.env.NEXTAUTH_SECRET
  
  let token = await getToken({req})
  console.log(req.cookies.tj)
  res.json({"kill":token})
}

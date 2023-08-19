import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(401).json({ msg: "invalid request" });
  }
  try {
    let user = await serverAuth(req,res)
    let len = await prismadb.movie.count()
    let randomNumber = Math.floor(Math.random()*len)
    let randomMovie = await prismadb.movie.findMany({
      skip:randomNumber,
      take:1
    })
    res.status(200).json({msg:randomMovie})

  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ msg: "something went wrong" });
  }
}

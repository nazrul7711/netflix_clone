import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let user = await serverAuth(req, res);
    let movies = await prismadb.movie.findMany()
    if(movies.length===0){
      return res.status(404).json({msg:"no movies here"})
    }
    res.status(200).json({msg:movies})
  } catch (error:any) {
    console.log(error)
    return res.status(500).json({msg:error.message})
  }
}

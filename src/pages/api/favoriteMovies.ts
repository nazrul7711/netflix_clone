import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user = await serverAuth(req, res);
  if (!user) {
    return res.status(403).json({ msg: "user is not logged in" });
  }
  let movies = await prismadb.movie.findMany({
    where:{
      id:{
        in:user.favoriteIds
      }
    }
  })
  return res.status(200).json({ msg: movies});
}

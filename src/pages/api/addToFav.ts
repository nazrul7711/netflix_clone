import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let {user} = await serverAuth(req, res);
    if (!user) {
      return res.status(403).json({ msg: "user is not logged in" });
    }
    let movieId = req.query.movieId

    const updatedUser = await prismadb.user.update({
      where:{
        email:user.email
      },
      data:{
        favoriteIds:{
          push:movieId
        }
      }
    })
    return res.status(200).json({ msg: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "sth went wrong" });
  }
}

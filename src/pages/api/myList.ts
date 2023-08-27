import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let {user} = await serverAuth(req, res);
    if (!user) {
      return res.status(403).json({ msg: "user is not logged in" });
    }
    let movieList = user.favoriteIds;
    return res.status(200).json({ msg: movieList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "sth went wrong" });
  }
}

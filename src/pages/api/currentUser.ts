import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(401).json({ msg: "invalid request" });
  }
  try {
    let {user} = await serverAuth(req, res);
    res.status(200).json({msg:user} );
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ msg: "sth went wrong" });
  }
}

export default handler;



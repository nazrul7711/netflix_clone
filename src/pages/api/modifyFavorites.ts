import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { movieId } = req.body;
    let {user} = await serverAuth(req, res);
    if (!user) {
      throw new Error("Error fetching user")
    }
    let movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      return res.status(409).json({ msg: "movie id is wrong" });
    }
    let existingMovie = await prismadb.user.findMany({
      where: {
        favoriteIds: {
          has: movieId,
        },
      },
    });

    if (existingMovie.length > 0) {
      return res.status(409).json({ msg: "movie already added" });
    }
    let updatedUser = await prismadb.user.update({
      where: {
        id: user.id,
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });
    return res.status(200).json({ msg: updatedUser });
  } else if (req.method === "DELETE") {
    let { movieId } = req.query;
    let {user} = await serverAuth(req, res);

    if (!user) {
      return res.status(403).json({ msg: "user is not logged in" });
    }
    let movie = await prismadb.movie.findUnique({
      where: {
        id: movieId as string,
      },
    });
    if (!movie) {
      return res.status(409).json({ msg: "movie id is wrong" });
    }
    let updatedMovieList = user.favoriteIds.filter(
      (movie) => movie !== movieId
    );
    let updatedUser = await prismadb.user.update({
      where: {
        id: user.id,
      },
      data: {
        favoriteIds: updatedMovieList,
      },
    });
    return res.status(200).json({ msg: updatedUser });
  }
}

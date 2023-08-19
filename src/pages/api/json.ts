import * as fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import prismadb from "@/lib/prismadb";

interface Movie {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

export default async function readJsonFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonData = await fs.readFile(
    path.join(process.cwd(), "movieData.json"),
    "utf-8"
  );
  const parsedData: Movie[] = JSON.parse(jsonData);
  console.log(typeof parsedData[0].title);
  

  parsedData.map(async (movie) => {
    try {
      await prismadb.movie.create({
        data: {
          title: movie.title,
          description: movie.description,
          videoUrl: movie.videoUrl,
          thumbnailUrl: movie.thumbnailUrl,
          genre: movie.genre,
          duration: parseInt(movie.duration),
        },
      });
      return res.status(201).json({ msg: "successfull" });
    } catch (error) {
      console.error("Error creating movie:", error);
      return res.status(500).json({ msg: "error " });
    }
  });

}

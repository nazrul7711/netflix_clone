import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb"


export default async function getMovie(req:NextApiRequest,res:NextApiResponse){
  try{
    let movieId = req.query.movieId as string
    console.log(movieId)
    let movie = await prismadb.movie.findUnique({
      where:{
        id:movieId
      }
    })
    if(!movie){
      return res.status(400).json({msg:"said movie not in record"})
    }
    res.status(200).json(movie.videoUrl)


  }catch(error){
    return res.status(500).json(error)
  }

}
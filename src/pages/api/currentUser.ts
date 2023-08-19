import { NextApiRequest,NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

async function handler(req:NextApiRequest,res:NextApiResponse){
  let user = await serverAuth(req)
}

export default handler
//serverAuth if session find user and return user same thing doing from currentUser , defined a fetcher function lib folder in hooks folder useCurrentUser that runs a useSwr to fetch data from api/currentUser [data,error,isLoading,mutate]
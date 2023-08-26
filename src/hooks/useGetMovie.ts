import fetcher from "@/lib/fetcher"
import useSwr from "swr"
export default function useGetMovie(){
  let {data,error,mutate}=useSwr("/api/getMovie",fetcher)
  return {
    data,error,mutate
  }
}
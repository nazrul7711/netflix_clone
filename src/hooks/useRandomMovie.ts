import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export default  function useRandomMovie() {
  let { data, error, isLoading, mutate } = useSWR("/api/randomVideo", fetcher,{
    revalidateIfStale:false,
    revalidateOnFocus:false,
    revalidateOnReconnect:false
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

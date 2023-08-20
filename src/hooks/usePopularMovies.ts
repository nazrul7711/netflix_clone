import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const usePopularMovies = () => {
  let { data, error, isLoading, mutate } = useSWR(
    "/api/popularMovies",
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default usePopularMovies;

import fetcher from "@/lib/fetcher";
import useSWR from "swr";
export default function useFavoriteMovies() {
  let { data, error, isLoading, mutate } = useSWR(
    "/api/favoriteMovies",
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

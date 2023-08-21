import React, { useRef } from "react";
import styles from "@/styles/popularMovies.module.scss";
import MovieTrailer from "./MovieTrailer";
import usePopularMovies from "@/hooks/usePopularMovies";
import { MovieType } from "../../global";

const PopularMovies = () => {
  const { data, error} = usePopularMovies();




  if (error) {
    return <div>Error Fetching Movies</div>;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.popular}>Popular Movies</div>
      <ul className={styles.movieList}>
        {data?.msg.map((movie: MovieType) => (
          <li key={movie.id}>
            <MovieTrailer
              videoUrl={movie.videoUrl}
              img={movie.thumbnailUrl}
              id={movie.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularMovies;

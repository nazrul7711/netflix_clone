import React, { useRef } from "react";
import styles from "@/styles/popularMovies.module.scss";
import MovieTrailer, { MovieTrailerRef } from "./MovieTrailer";
import usePopularMovies from "@/hooks/usePopularMovies";
import { MovieType } from "../../global";

const PopularMovies = () => {
  const { data, error, isLoading } = usePopularMovies();
  const mapRef = useRef<Map<string, MovieTrailerRef>>();
  function getMap() {
    if (!mapRef.current) {
      mapRef.current = new Map();
    }
    return mapRef.current;
  }

  function mouseHandler(id: string) {
    let map = getMap();
    let video = map.get(id);
    video?.playVideo();
  }
  function leaveHandler(id: string) {
    let map = getMap();
    let video = map.get(id);
    video?.pauseVideo();
  }
  if(error){
    return <div>Error Fetching Movies</div>
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.popular}>Popular Movies</div>
      <ul className={styles.movieList}>
        {data.msg.map((movie: MovieType) => (
          <li key={movie.id}>
            <MovieTrailer
              videoUrl={movie.videoUrl}
              id={movie.id}
              ref={(node) => {
                let map = getMap();
                if (node) {
                  map.set(movie.id, node);
                } else {
                  map.delete(movie.id);
                }
              }}
              onMouseEnter={mouseHandler}
              onMouseLeave={leaveHandler}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularMovies;

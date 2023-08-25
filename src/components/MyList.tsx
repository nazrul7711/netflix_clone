import React from 'react'
import useFavoriteMovies from '@/hooks/useFavoriteMovies'
import MovieTrailer from './MovieTrailer'
import { MovieType } from '../../global'
import styles from "@/styles/favorite.module.scss"

const MyList = () => {
  let {data,error,isLoading} = useFavoriteMovies()
  // console.log(data,"this is kill bill")
  return (
    <div className={styles.wrap}>
      <div className={styles.popular}>My List</div>
      <ul className={styles.movieList}>
        {data?.map((movie: MovieType) => (
          <li key={movie.id}>
            <MovieTrailer
              videoUrl={movie.videoUrl}
              img={movie.thumbnailUrl}
              id={movie.id}
              myList={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyList
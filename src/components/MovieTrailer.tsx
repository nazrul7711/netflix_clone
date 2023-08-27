import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TiTickOutline } from "react-icons/Ti";
import { BsFillPlayCircleFill } from "react-icons/Bs";
import styles from "@/styles/movieTrailer.module.scss";
import { useRef } from "react";
import useFavoriteMovies from "@/hooks/useFavoriteMovies";
import useSwr from "swr";
import fetcher from "@/lib/fetcher";
import axios from "axios";
import { useRouter } from "next/router";

interface MovieTrailerProp {
  videoUrl: string;
  img: string;
  id: string;
  myList?: boolean;
}

const MovieTrailer = ({ videoUrl, img, id }: MovieTrailerProp) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const { mutate } = useFavoriteMovies();
  let router = useRouter();
  const {
    data,
    error,
    mutate: userMutate,
  } = useSwr("/api/currentUser", fetcher);
  if (error) {
    return <p>Error fetching the user</p>;
  }
  let user = data?.msg;
  let isMovie = user?.favoriteIds?.includes(id);

  async function addHandler() {
    if (isMovie) {
      await axios.delete(
        `http://localhost:3000/api/modifyFavorites?movieId=${id}`
      );
      mutate();
      userMutate();
    } else {
      await axios.post(`http://localhost:3000/api/modifyFavorites`, {
        movieId: id,
      });
      mutate();
      userMutate();
    }
    setAdded(isMovie);
  }
  let Icon = isMovie ? TiTickOutline : AiOutlinePlus;
  if (hover) {
    videoRef.current?.play();
  }
  function playMovieHandler() {
    router.push(id);
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className={styles.video}>
        {hover ? (
          <video src={videoUrl} ref={videoRef} muted loop />
        ) : (
          <img src={img} className={styles.image} />
        )}
      </div>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={playMovieHandler}>
          <BsFillPlayCircleFill size={40} />
        </button>
        <button className={styles.btn} onClick={addHandler}>
          <Icon style={{ fontSize: "1.2rem" }} />
        </button>
      </div>
    </div>
  );
};

export default MovieTrailer;

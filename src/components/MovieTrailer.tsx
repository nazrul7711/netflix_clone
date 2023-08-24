import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlinePlus, AiOutlinePlayCircle } from "react-icons/Ai";
import { TiTickOutline } from "react-icons/Ti";
import { BsFillPlayCircleFill } from "react-icons/Bs";
import styles from "@/styles/movieTrailer.module.scss";
import { useRef } from "react";
import axios from "axios";
import useFavoriteMovies from "@/hooks/useFavoriteMovies";
import useSwr from "swr";
import fetcher from "@/lib/fetcher";

interface MovieTrailerProp {
  videoUrl: string;
  img: string;
  id: string;
  myList?: boolean;
}

const MovieTrailer = ({ videoUrl, img, id, myList }: MovieTrailerProp) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const { mutate } = useFavoriteMovies();
  const { data } = useSwr("/api/currentUser", fetcher);
  let user = data?.msg
  const isMovieInList = useMemo(() => {
    let list = user.favoriteIds;
    return list?.includes(id);
  }, [id]);
  const addHandler = useCallback(() => {
    
  }, [isMovieInList,user]);



  if (hover) {
    videoRef.current?.play();
  }
  if (myList) {
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
          <button className={styles.btn}>
            <BsFillPlayCircleFill size={40} />
          </button>
          <button className={styles.btn} onClick={addHandler}>
            {added ? (
              <TiTickOutline style={{ fontSize: "1.2rem" }} />
            ) : (
              <AiOutlinePlus style={{ fontSize: "1.2rem" }} />
            )}
          </button>
        </div>
      </div>
    );
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
        <button className={styles.btn}>
          <BsFillPlayCircleFill size={40} />
        </button>
        <button className={styles.btn} onClick={() => addHandler(id)}>
          {added ? (
            <TiTickOutline style={{ fontSize: "1.2rem" }} />
          ) : (
            <AiOutlinePlus style={{ fontSize: "1.2rem" }} />
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieTrailer;

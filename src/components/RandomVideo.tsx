import React from "react";
import styles from "@/styles/randomVideo.module.scss";
import useRandomMovie from "@/hooks/useRandomMovie";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsPlay } from "react-icons/bs";
import { useRouter } from "next/router";
import { MovieType } from "../../global";

type RandomVideoProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMovie:  React.Dispatch<React.SetStateAction<MovieType|undefined>>
};

const RandomVideo = ({ setModal,setMovie }: RandomVideoProps) => {
  let { data, error, isLoading } = useRandomMovie();

  let router = useRouter();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error fetching Movie</p>;
  }
  function playHandler() {
    router.push(`/${data?.msg[0]?.id}`);
  }
  function informationHandler() {
    setModal(true);
    setMovie(data?.msg[0]);
  }
  return (
    <div className={styles.wrapper}>
      <video
        className={styles.video}
        muted
        autoPlay
        src={data?.msg[0]?.videoUrl}
      />
      <div className={styles.movieDetails}>
        <div className={styles.title}>{data?.msg[0].title}</div>
        <div className={styles.description}>{data?.msg[0].description}</div>
        <div className={styles.buttons}>
          {data && (
            <button onClick={informationHandler}>
              <div>
                <AiOutlineInfoCircle />
              </div>
              More Info
            </button>
          )}
          {data && (
            <button onClick={playHandler}>
              <div>
                <BsPlay />
              </div>
              Play
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomVideo;

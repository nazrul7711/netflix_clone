import React from "react";
import styles from "@/styles/randomVideo.module.scss";
import useRandomMovie from "@/hooks/useRandomMovie";
import { AiOutlineInfoCircle } from "react-icons/Ai";

const RandomVideo = () => {
  let { data, error, isLoading, mutate } = useRandomMovie();
  // console.log(data.msg[0].videoUrl)
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
        {data && (
          <button>
            <div>
              <AiOutlineInfoCircle />
            </div>
            More Info
          </button>
        )}
      </div>
    </div>
  );
};

export default RandomVideo;

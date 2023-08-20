import React from "react";
import { AiOutlinePlus, AiOutlinePlayCircle } from "react-icons/Ai";
import { BsFillPlayCircleFill } from "react-icons/Bs";
import styles from "@/styles/movieTrailer.module.scss";
import { forwardRef, useImperativeHandle, useRef } from "react";

export interface MovieTrailerRef {
  playVideo(): void;
  pauseVideo(): void;
}
interface MovieTrailerProp {
  videoUrl: string;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
  id: string;
}

const MovieTrailer = forwardRef<MovieTrailerRef, MovieTrailerProp>(
  ({ videoUrl, onMouseEnter, id, onMouseLeave }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          playVideo() {
            videoRef.current?.play();
          },
          pauseVideo() {
            const video = videoRef.current as HTMLVideoElement;
            video.pause();
            video.currentTime = 0;
          },
        };
      },
      []
    );
    return (
      <div
        className={styles.wrapper}
        onMouseEnter={() => onMouseEnter(id)}
        onMouseLeave={() => onMouseLeave(id)}
      >
        <div className={styles.video}>
          <video src={videoUrl} ref={videoRef} muted loop />
        </div>
        <div className={styles.buttons}>
          <button className={styles.btn}>
            <BsFillPlayCircleFill size={40} />
          </button>
          <button className={styles.btn}>
            <AiOutlinePlus style={{ fontSize: "1.2rem" }} />
          </button>
        </div>
      </div>
    );
  }
);

export default MovieTrailer;

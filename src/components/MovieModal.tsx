import React from "react";
import styles from "@/styles/movieModal.module.scss";
import { AiFillCloseCircle } from "react-icons/Ai";

type MovieModalProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const MovieModal = ({ setModal }: MovieModalProps) => {
  function backgroundRemoveHandler() {
    setModal(false);
  }
  function modalCloseHandler() {
    setModal(false);
  }
  return (
    <>
      <div
        className={styles.background}
        onClick={backgroundRemoveHandler}
      ></div>
      <div className={styles.modal}>
        <button onClick={modalCloseHandler}>
          <AiFillCloseCircle size={40} />
        </button>
        <video src={} muted autoPlay />
        <div></div>
      </div>
    </>
  );
};

export default MovieModal;

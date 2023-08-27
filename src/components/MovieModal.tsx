import styles from "@/styles/movieModal.module.scss";
import { AiFillCloseCircle } from "react-icons/Ai";
import { MovieType } from "../../global";

type MovieModalProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  movie: MovieType | undefined;
};

const MovieModal = ({ setModal, movie }: MovieModalProps) => {
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
        <video src={movie?.videoUrl} muted autoPlay />
        <div className={styles.titleSection}>
          <div className={styles.ti}>Title</div>
          <div className={styles.title}>{movie?.title}</div>
        </div>
        <div className={styles.descSection}>
          <div className={styles.ti}>Description</div>
          <div className={styles.description}>{movie?.description}</div>
        </div>
      </div>
    </>
  );
};

export default MovieModal;

import styles from "@/styles/fullMovieTrailer.module.scss";
import axios from "axios";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

export async function getServerSideProps(context: NextPageContext) {
  let movieId = context.query.dynamicMovie;

  let movieUrl = await axios.get(
    `netflix-clone-h3hc-b7fbtxqmo-nazrul7711.vercel.app/api/getMovie?movieId=${movieId}`
  );
  return {
    props: {
      videoUrl: movieUrl.data,
    },
  };
}

const Index = ({ videoUrl }: { videoUrl: string }) => {
  let router = useRouter();
  function takeBackHandler() {
    router.push("/");
  }
  return (
    <div className={styles.wrapper} onClick={takeBackHandler}>
      <div className={styles.arrow}>
        <AiOutlineArrowLeft style={{ fontSize: "5rem" }} />
      </div>
      <video src={videoUrl} autoPlay muted />
    </div>
  );
};

export default Index;

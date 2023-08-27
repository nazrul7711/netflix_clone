import React from "react";
import styles from "@/styles/profile.module.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Index = () => {
  let session = useSession();
  let user = session.data?.user;
  let router = useRouter();
  function profileHandler() {
    router.push("/");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageHolder} onClick={profileHandler}>
        <Image
          src={"/images/download.png"}
          alt="profileImage"
          height={200}
          width={200}
        />
      </div>
      <h3 className={styles.welcome}>Welcome {user?.name}</h3>
    </div>
  );
};

export default Index;

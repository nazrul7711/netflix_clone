import React, { useEffect, useState } from "react";
import styles from "@/styles/auth.module.scss";
import Image from "next/image";
import Input from "@/components/Input";

const index = () => {
  const [signUp, setSignUp] = useState<boolean>(true);


  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Image
          src={"/images/Netflix-Logo.png"}
          alt={"logo"}
          width={200}
          height={120}
        />
      </div>
      <div className={styles.login}>
        <h1>Sign In</h1>
        <form>
          {signUp && (
            <Input
              id="Username"
              label="Username"
              type="text"
              value=""
              onChange={() => {}}
            />
          )}
          <Input
            id="Email"
            label="email"
            type="email"
            value=""
            onChange={() => {}}
          />
          <Input
            id="Password"
            label="password"
            type="password"
            value=""
            onChange={() => {}}
          />
          <button>{signUp ?"Sign Up":"Login"}</button>
        </form>
        <p>
          {!signUp && "New to Netflix?"}
          <span onClick={() => setSignUp((e) => !e)}>
            {signUp ? "Login" : "Sign Up Now"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default index;

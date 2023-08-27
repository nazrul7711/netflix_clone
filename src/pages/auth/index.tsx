import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "@/styles/auth.module.scss";
import Image from "next/image";
import axios from "axios";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Index = () => {
  const [signUp, setSignUp] = useState<boolean>(true);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  let router = useRouter();

  const registerHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let res = await axios.post("/api/register", {
        email,
        name,
        password,
      });
      console.log(res)
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.msg);
    }
  };
  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();

    let res = await signIn("credentials", {
      email,
      password,
      redirect: false, //if true on sign in fail it will take me to /auth page mentioned in sign in . if false it will not take u anywhere if sign in is successfull

    });
    if (res?.ok) {
      router.push("/profile");
    } else {
      setError(res?.error!);
    }
  };


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
        <form onSubmit={signUp ? registerHandler : loginHandler}>
          {signUp && (
            <Input
              id="Username"
              label="Username"
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
          )}
          <Input
            id="Email"
            label="Email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            id="Password"
            label="Password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <button>{signUp ? "Sign Up" : "Login"}</button>
          {!signUp && (
            <div className={styles.gitButtons}>
              <div
                className={styles.gitButton}
                onClick={() => signIn("google", { callbackUrl: "/profile" })}
              >
                <FcGoogle />
              </div>

              <div
                className={styles.gitButton}
                onClick={() => signIn("github", { callbackUrl: "/profile" })}
              >
                <FaGithub />
              </div>
            </div>
          )}
        </form>
        <p>
          {!signUp && "New to Netflix?"}
          <span onClick={() => setSignUp((e) => !e)}>
            {signUp ? "Login" : "Sign Up Now"}
          </span>
        </p>
        {error && <p className={styles.errorMsg}>{error}</p>}
      </div>
    </div>
  );
};

export default Index;

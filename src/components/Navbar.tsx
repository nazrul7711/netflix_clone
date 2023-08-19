import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/navbar.module.scss";
import NavItem from "./NavItem";
import { AiOutlineSearch, AiOutlineBell, AiOutlineDown } from "react-icons/Ai";

const Navbar = () => {
  const [width, setWidth] = useState<number>(1440);
  const [show, setShow] = useState<boolean>(false);
  function screenWidth() {
    setWidth(window.innerWidth);
  }
  function toggleShow() {
    setShow((w) => !w);
  }

  useEffect(() => {
    window.addEventListener("resize", screenWidth);
    return () => window.removeEventListener("resize", screenWidth);
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles.leftNavbar}>
        <div className={styles.logo}>
          <Image
            src={"/images/Netflix-Logo.png"}
            alt={"netflix-logo"}
            height={70}
            width={120}
          />
        </div>
        <div className={`${styles.navItems} ${show ? styles.hidden : ""}`}>
          {width < 800 && (
            <div onClick={toggleShow}>
              <AiOutlineDown />
            </div>
          )}
          <NavItem title="Home" />
          <NavItem title="Series" />
          <NavItem title="Films" />
          <NavItem title="New & Popular" />
          <NavItem title="My List" />
          <NavItem title="Browse By Languages" />
        </div>
      </div>
      <div className={styles.profileTab}>
        <div>
          <AiOutlineSearch />
        </div>
        <div>
          <AiOutlineBell />
        </div>
        <div>
          <Image
            src={"/images/download.png"}
            alt={"profile"}
            height={50}
            width={50}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
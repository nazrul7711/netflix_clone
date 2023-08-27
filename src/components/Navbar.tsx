import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/navbar.module.scss";
import NavItem from "./NavItem";
import { AiOutlineSearch, AiOutlineBell, AiOutlineDown } from "react-icons/Ai";
import { signOut } from "next-auth/react";


type NavbarProps={
  bool:boolean
}

const Navbar = ({bool}:NavbarProps) => {
  const [width, setWidth] = useState<number>(1440);
  const [show, setShow] = useState<boolean>(false);
  function screenWidth() {
    setWidth(window.innerWidth);
  }
  function toggleShow() {
    setShow((w) => !w);
  }

  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", screenWidth);
    return () => window.removeEventListener("resize", screenWidth);
  }, []);
  async function dropdownHandler() {
    await signOut({ callbackUrl: "/auth" });
  }


  return (
    <div className={`${styles.navbar} ${bool? styles.onAnimate:""}`}>
      <div className={styles.leftNavbar}>
        <div className={styles.logo} >
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
          <AiOutlineSearch size={30} />
        </div>
        <div>
          <AiOutlineBell size={30} />
        </div>
        <div className={`${styles.dropdown} ${dropdown ? styles.active : ""}`}>
          <div
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            className={styles.profileImage}
          >
            <Image
              src={"/images/download.png"}
              alt={"profile"}
              height={50}
              width={50}
            />
          </div>
          {dropdown && (
            <div
              className={styles.dropdownMenu}
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <a href="#">Account</a>
              <a href="#">Profile </a>
              <button onClick={dropdownHandler}>Sign out of Netflix </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;



import React from "react";
import styles from "./header.module.scss";
import Nav from "../nav";

function Header() {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  );
}

export default Header;

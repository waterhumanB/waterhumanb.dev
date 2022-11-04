import React from "react";
import styles from "./header.module.scss";
import Nav from "../Nav";

function Header() {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  );
}

export default Header;

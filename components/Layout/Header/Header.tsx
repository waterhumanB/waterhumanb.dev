import React from "react";
import styles from "./header.module.scss";
import Nav from "../nav/Nav";

const header = () => {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  );
};

export default header;

import React from "react";
import styles from "./header.module.scss";
import Nav from "../../Nav";

const header = () => {
  return (
    <header className={styles.header}>
      <Nav></Nav>
    </header>
  );
};

export default header;

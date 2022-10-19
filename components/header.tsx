import React from "react";
import styles from "./header.module.scss";
import Nav from "./Nav";
import Image from "next/image";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";

const name = "waterHumanB";

const header = ({ home }: any) => {
  return (
    <header className={styles.header}>
      <Nav></Nav>
      {home ? (
        <>
          <Image
            priority
            src="/images/profile.jpg"
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt="my site?"
          />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <a>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>{name}</a>
            </Link>
          </h2>
        </>
      )}
    </header>
  );
};

export default header;

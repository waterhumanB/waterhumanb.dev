import Link from "next/link";
import RssLogo from "../../../../public/assets/icons/RssLogo.svg";
import GitLogo from "../../../../public/assets/icons/gitHubLogo.svg";
import styles from "./footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.Logo}>
        <Link href='https://github.com/waterhumanB' target='_blank'>
          <GitLogo />
        </Link>
        <Link href='/'>
          <RssLogo />
        </Link>
      </div>
      <div className={styles.copy}>Copyright © 2023 WaterHumanB</div>
      <div className={styles.devBox}>
        <Link
          className={styles.dev}
          href='https://github.com/waterhumanB/waterhumanb.dev'
          target='_blank'
        >
          <div>WaterHumanB.dev</div>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;

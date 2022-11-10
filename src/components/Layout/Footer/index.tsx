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
      <div className={styles.Copy}>Copyright © 2022 WaterHumanB</div>
    </footer>
  );
}

export default Footer;

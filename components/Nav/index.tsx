import navlinks from "../../data/navlinks";
import Link from "next/link";
import styles from "./nav.module.scss";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div>WaterHumanB</div>
      <div>
        {navlinks.map(nav => (
          <Link href={nav.link} key={nav.title}>
            <a>{nav.title}</a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;

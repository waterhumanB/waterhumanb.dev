import Link from "next/link";
import navlinks from "../../../../data/navlinks";
import styles from "./nav.module.scss";

function Nav() {
  return (
    <div className={styles.nav}>
      <div>
        <Link href='/'>
          <div>Home</div>
        </Link>
      </div>
      <nav className={styles.navLinks}>
        {navlinks.map((nav) => (
          <Link href={nav.link} key={nav.title}>
            <div>{nav.title}</div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Nav;

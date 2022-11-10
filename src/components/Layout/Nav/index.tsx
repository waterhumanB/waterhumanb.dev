import Link from "next/link";
import { useRouter } from "next/router";
import navlinks from "../../../data/navlinks";
import styles from "./nav.module.scss";

function Nav() {
  const router = useRouter();
  return (
    <div className={styles.nav}>
      <div>
        <Link href='/'>
          <div className={router.pathname === "/" ? styles.active : ""}>
            Home
          </div>
        </Link>
      </div>
      <nav className={styles.navLinks}>
        {navlinks.map((nav) => (
          <Link href={nav.link} key={nav.title}>
            <div
              className={
                router.pathname.includes(nav.link) ? styles.active : ""
              }
            >
              {nav.title}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Nav;

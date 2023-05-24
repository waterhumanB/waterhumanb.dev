import { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"
import styles from "./layout.module.scss"

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  )
}

import { ReactNode } from "react"
import { DefaultSeo } from "next-seo"
import Footer from "./Footer"
import Header from "./Header"
import styles from "./layout.module.scss"

interface Props {
  children: ReactNode
  metaData?: object
}

export default function Layout({ children, metaData }: Props) {
  return (
    <>
      <DefaultSeo {...metaData} />
      <Header />
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  )
}

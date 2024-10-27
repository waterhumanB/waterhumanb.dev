import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "./sideBar.module.scss"
import { INoteData } from "../../../types/note"
import { IBlogData } from "../../../types/blog"

interface Props {
  allPostData: INoteData[] | IBlogData[]
}

function SideBar({ allPostData }: Props) {
  const router = useRouter()

  const nowMenu = router.pathname.split("/")[1]

  return (
    <aside className={styles.sideBarContainer}>
      <div className={styles.sideBar}>
        <div>{nowMenu === "note" ? "Note" : "Blog"} Menu</div>
        {allPostData?.map((data: INoteData | IBlogData) => (
          <Link
            key={data.title}
            className={`${styles.postItem} ${
              data.slug === router.query.slug ? styles.hovered : ""
            }`}
            href={`/${nowMenu}/${data.slug}`}
          >
            {data.title}
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default SideBar

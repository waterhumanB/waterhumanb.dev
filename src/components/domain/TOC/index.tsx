import React from "react"
import Link from "next/link"
import styles from "./TOC.module.scss"
import { INoteData } from "../../../types/note"
import { IBlogData } from "../../../types/blog"
import { useHeadingsObserver } from "../../../hooks/useHeadingObserver"

interface Props {
  postData: INoteData | IBlogData | undefined
  comment: boolean
}
function TOC({ postData, comment }: Props) {
  const lines = postData?.content?.split("\n")

  // const headers = lines?.filter((line) => line.trim().startsWith("#"))

  const headerFilter = comment ? "h2,h3,h4" : "h2"

  const headers = lines?.filter((line) => {
    const trimmedLine = line.trim()
    if (headerFilter.includes("h2") && trimmedLine.startsWith("## "))
      return true
    if (headerFilter.includes("h3") && trimmedLine.startsWith("### "))
      return true
    if (headerFilter.includes("h4") && trimmedLine.startsWith("#### "))
      return true
    return false
  })

  const activeIdList = useHeadingsObserver(headerFilter)

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault() // 기본 링크 동작 방지
    const target = document.getElementById(id)
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth", // 부드러운 스크롤 적용
      })
    }
  }

  return (
    <aside className={styles.tocContainer}>
      <div className={styles.toc}>
        <div>Table of Content</div>
        {headers?.map((data) => {
          const headerId = data
            .replace(" ", "")
            .replaceAll(/[^a-zA-Z0-9가-힣\s]/g, "")
            .replaceAll(" ", "-")
            .toLowerCase()
          const isActive = activeIdList.includes(`#${headerId}`)

          return (
            <Link
              key={data}
              href={`#${headerId}`}
              className={`${
                data.split(" ")[0].length === 2
                  ? styles.mainHead
                  : styles.subHead
              } ${isActive ? styles.active : ""}`}
              onClick={(e) => handleClick(e, headerId)}
            >
              {data.replace(" ", "").replaceAll("#", "")}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export default TOC

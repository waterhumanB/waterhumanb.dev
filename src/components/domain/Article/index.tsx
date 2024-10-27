import useSWR from "swr"
import React from "react"
import styles from "./section.module.scss"
import Content from "./Content"
import { IBlogData } from "../../../types/blog"

interface Props {
  slug: string | undefined
}

function Section({ slug }: Props) {
  const { data: post } = useSWR<IBlogData>(["Props", slug])

  return (
    <article className={styles.container}>
      <Content content={post?.content} />
    </article>
  )
}

export default Section

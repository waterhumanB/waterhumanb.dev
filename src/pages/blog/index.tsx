import { GetStaticProps } from "next"
import Image from "next/image"
import React, { MouseEvent, useState } from "react"
import Link from "next/link"
import altImg from "../../../public/assets/images/waterhumanb.png"
import Layout from "../../components/Layout"
import { getSortedPostsData } from "../../lib/posts"
import { IPost } from "../../types/post"
import styles from "./blog.module.scss"
import { categoryFilter } from "../../utils/categoryFilter"
import { categoryList } from "../../constants/category"

const META_DATA = {
  title: "Blog",
  description:
    "개발하면서 느낀점, 생각 등을 공유하거나 복습하고 싶은 기술들을정리하는 곳입니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "waterhumanb-blog.vercel.app/blog",
    title:
      "개발하면서 느낀점, 생각 등을 공유하거나 복습하고 싶은 기술들을정리하는 곳입니다.",
    site_name: "waterhumanb.dev",
    images: [
      {
        url: "../../public/thumbnail.png",
        width: 285,
        height: 167,
        alt: "이미지",
      },
    ],
  },
}

function Blog({ allPostsData }: IPost) {
  const [cat, setCat] = useState("")

  const filteredData = categoryFilter(allPostsData)

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    setCat(e.currentTarget.name)
  }

  return (
    <Layout metaData={META_DATA}>
      <section className={styles.container}>
        <div className={styles.blogTitle}>
          <h2>Blog</h2>
          <p>
            개발하면서 느낀점, 생각 등을 공유하거나 복습하고 싶은 기술들을
            정리하는 곳입니다.
          </p>
        </div>
        <div className={styles.categoryBox}>
          <button
            className={cat === "" ? styles.focus : ""}
            type='button'
            onClick={() => setCat("")}
          >
            #All
          </button>
          {filteredData.map((data) => (
            <button
              className={cat === data ? styles.focus : ""}
              type='button'
              onClick={handleFilter}
              key={data}
              name={data}
            >
              {`#${data}`}
            </button>
          ))}
        </div>
        <div className={styles.postBox}>
          {allPostsData
            .filter((data) => (cat === "" ? data : cat === data.category))
            .map(({ slug, date, title, description, thumbnail, category }) => (
              <Link
                key={slug}
                className={styles.postItem}
                href={`/blog/${slug}`}
              >
                <Image
                  className={styles.imgBox}
                  src={thumbnail || altImg}
                  alt={slug}
                  width={120}
                  height={120}
                />
                <div className={styles.descBox}>
                  <div className={styles.title}>{title}</div>
                  <div className={styles.dateBox}>
                    <div
                      className={`${styles.category} ${
                        categoryList.includes(`${category}`)
                          ? styles[`${category}`]
                          : styles.default
                      }`}
                    >
                      {category}
                    </div>
                    <div className={styles.date}>{date}</div>
                  </div>
                  <div className={styles.desc}>{description}</div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </Layout>
  )
}

export default Blog

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

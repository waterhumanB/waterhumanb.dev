import { useState, MouseEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import altImg from "../../../../public/assets/images/waterhumanb.png"
import { IBlog } from "../../../types/blog"
import { categoryFilter } from "../../../utils/categoryFilter"
import styles from "./blogInformation.module.scss"
import { categoryList } from "../../../constants/category"

function BlogInformation({ allPostsData }: IBlog) {
  const [cat, setCat] = useState("")

  const filteredData = categoryFilter(allPostsData)

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    setCat(e.currentTarget.name)
  }
  return (
    <section className={styles.container}>
      <div className={styles.blogTitle}>
        <h1>Blog</h1>
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
            <Link key={slug} className={styles.postItem} href={`/blog/${slug}`}>
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
  )
}

export default BlogInformation

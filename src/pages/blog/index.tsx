import { GetStaticProps } from "next";
import React, { MouseEvent, useState } from "react";
import Link from "next/link";

import Layout from "../../components/Layout";
import { getSortedPostsData } from "../../lib/posts";
import { IPost } from "../../types/post";
import styles from "./blog.module.scss";
import { categoryFilter } from "../../utils/categoryFilter";

function Blog({ allPostsData }: IPost) {
  const [cat, setCat] = useState("");

  const filteredData = categoryFilter(allPostsData);

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    setCat(e.currentTarget.name);
  };

  return (
    <Layout>
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
        <div>
          {allPostsData
            .filter(({ category }) => cat === category)
            .map(({ slug, date, title }) => (
              <div className={styles.postBox} key={slug}>
                <Link href={`/blog/${slug}`}>
                  <div>{title}</div>
                </Link>
                <small>{date}</small>
              </div>
            ))}
          {cat === "" &&
            allPostsData.map(({ slug, date, title }) => (
              <div className={styles.postBox} key={slug}>
                <Link href={`/blog/${slug}`}>
                  <div>{title}</div>
                </Link>
                <small>{date}</small>
              </div>
            ))}
        </div>
      </section>
    </Layout>
  );
}

export default Blog;

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

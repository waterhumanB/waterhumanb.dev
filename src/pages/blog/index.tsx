import { GetStaticProps } from "next";
import React, { MouseEvent, useState } from "react";
import Link from "next/link";

import Layout from "../../components/Layout";
import { getSortedPostsData } from "../../lib/posts";
import { IPost } from "../../types/post";
import styles from "./blog.module.scss";

function Blog({ allPostsData }: IPost) {
  const [cat, setCat] = useState("");

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    setCat(e.currentTarget.innerText);
  };
  const entries = Object.entries(allPostsData).map((data) => {
    return data;
  });

  const maping = allPostsData.map((data: any) => data.category);

  console.log(
    allPostsData.filter(
      (data: any, index) => maping.indexOf(data.category) === index,
    ),
  );
  // filter로 인덱스를 돌아 같은 것들은 걸러주고 나머지만 뽑아준다.
  return (
    <Layout>
      <h2>Blog</h2>
      <section>
        <div className={styles.catBox}>
          {allPostsData.map(({ slug, category }: any) => (
            <button type='button' onClick={handleFilter} key={slug}>
              {category}
            </button>
          ))}
        </div>
        <ul>
          {allPostsData
            .filter(({ category }: any) => cat === category)
            .map(({ slug, date, title }: any) => (
              <li className={styles.postBox} key={slug}>
                <Link href={`/blog/${slug}`}>
                  <div>{title}</div>
                </Link>
                <small>{date}</small>
              </li>
            ))}
          {cat === "" &&
            allPostsData.map(({ slug, date, title }: any) => (
              <li className={styles.postBox} key={slug}>
                <Link href={`/blog/${slug}`}>
                  <div>{title}</div>
                </Link>
                <small>{date}</small>
              </li>
            ))}
        </ul>
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

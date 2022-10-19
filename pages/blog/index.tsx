import Link from "next/link";
import React from "react";
import { postsBlogDirectory } from "../../lib/blog";
import { getSortedPostsData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.scss";

const Blog = ({ allPostsData }: any) => {
  return (
    <main>
      <h1>Blog</h1>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ slug, date, title }: any) => (
          <li className={utilStyles.listItem} key={slug}>
            <Link href={`/blog/${slug}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>{date}</small>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Blog;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData(postsBlogDirectory);
  return {
    props: {
      allPostsData,
    },
  };
}

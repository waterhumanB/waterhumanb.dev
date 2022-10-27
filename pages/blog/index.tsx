import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import { getSortedPostsData } from "../../lib/posts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Blog({ allPostsData }: any) {
  return (
    <Layout home>
      <h2>Blog</h2>
      <main>
        <ul>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {allPostsData.map(({ slug, date, title }: any) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <div>{title}</div>
              </Link>
              <br />
              <small>{date}</small>
            </li>
          ))}
        </ul>
      </main>
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

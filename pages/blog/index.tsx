import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { getSortedPostsData } from "../../lib/posts";
import { IPost } from "../../types/post";

function Blog({ allPostsData }: IPost) {
  return (
    <Layout>
      <h2>Blog</h2>
      <main>
        <ul>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {allPostsData.map(({ slug, date, title }: any) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
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

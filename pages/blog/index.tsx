import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import { getSortedPostsData } from "../../lib/posts";

const Blog = ({ allPostsData }: any) => {
  return (
    <Layout home>
      <h2>Blog</h2>
      <main>
        <ul>
          {allPostsData.map(({ slug, date, title }: any) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>{date}</small>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default Blog;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

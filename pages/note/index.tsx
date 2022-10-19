import React from "react";
import Link from "next/link";
import { postsBlogDirectory } from "../../lib/blog";
import { getSortedPostsData } from "../../lib/posts";
import Layout from "../../components/Layout";

const Note = ({ allPostsData }: any) => {
  return (
    <Layout home>
      <h2>Note</h2>
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

export default Note;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData(postsBlogDirectory);
  return {
    props: {
      allPostsData,
    },
  };
}

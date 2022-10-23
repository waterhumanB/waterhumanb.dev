import React from "react";
import Link from "next/link";
import { getSortedNotesData } from "../../lib/note";
import Layout from "../../components/Layout";

const Note = ({ allPostsData }: any) => {
  console.log(allPostsData);

  const notePost = allPostsData.map(({ noteName }: any) => {
    return noteName;
  });
  console.log("ddd", notePost);
  const moreMap = notePost.map((data: any) => {
    return data;
  });
  return (
    <Layout home>
      <h2>Note!</h2>
      <main></main>
    </Layout>
  );
};

export default Note;

export async function getStaticProps() {
  const allPostsData = getSortedNotesData();
  return {
    props: {
      allPostsData,
    },
  };
}

import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import HomeProfile from "../components/common/HomeProfile";
import { getSortedPostsData } from "../lib/posts";
import { getSortedNotesData } from "../lib/note";

export default function Home() {
  return (
    <Layout>
      <HomeProfile />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getSortedPostsData();
  const allNotesData = getSortedNotesData();
  return {
    props: {
      allPostsData,
      allNotesData,
    },
  };
};

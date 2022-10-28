import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../../components/Layout";
import ContentHtml from "../../../components/Section/contentHtml";
import { getAllNoteSlugs, getNoteData } from "../../../lib/note";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Post({ postData }: any) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData?.title}
      <br />
      {postData?.slug}
      <br />
      {postData?.date}
      <br />
      <ContentHtml content={postData?.contentHtml} />
      <br />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllNoteSlugs();
  return {
    paths,
    fallback: false,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const postData = await getNoteData(params.slug, params.noteName);
  return {
    props: { postData },
  };
};

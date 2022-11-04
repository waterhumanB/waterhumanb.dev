import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import useSWR, { unstable_serialize as unstableSerialize } from "swr";
import Layout from "../../../components/Layout";
import ContentHtml from "../../../components/Section/ContentHtml";
import { getAllNoteSlugs, getNoteData } from "../../../lib/note";

interface Props {
  slug: string;
}

export default function Post({ slug }: Props) {
  const { data: postData } = useSWR(["Props", slug]);

  return (
    <Layout>
      <Head>
        <title>{postData?.title}</title>
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
    props: {
      slug: postData.slug,
      fallback: {
        [unstableSerialize(["Props", postData.slug])]: postData,
      },
    },
  };
};

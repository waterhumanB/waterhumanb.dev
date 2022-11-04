import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import useSWR, {
  unstable_serialize as unstableSerialize,
  useSWRConfig,
} from "swr";
import Layout from "../../../components/Layout/Layout";
import ContentHtml from "../../../components/section/contentHtml/ContentHtml";
import { getAllNoteSlugs, getNoteData } from "../../../lib/note";

interface Props {
  slug: string;
}

export default function Post({ slug }: Props) {
  const { cache } = useSWRConfig();
  const { data: postData, isValidating } = useSWR(["Props", slug]);

  // eslint-disable-next-line no-console
  console.log("SWR", postData);
  // eslint-disable-next-line no-console
  const check = cache.get(["Props", slug]);
  // eslint-disable-next-line no-console
  console.log("Cache", check);

  if (isValidating) {
    return <div>validating...</div>;
  }
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

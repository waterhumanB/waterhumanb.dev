import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import useSWR, {
  useSWRConfig,
  unstable_serialize as unstableSerialize,
} from "swr";
import Layout from "../../components/Layout";
import ContentHtml from "../../components/section/contentHtml";
import { getAllPostSlugs, getPostData } from "../../lib/posts";

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
        <title>{postData.title}</title>
      </Head>
      {postData?.title}
      <br />
      {postData?.slug}
      <br />
      {postData?.date}
      <br />
      <ContentHtml content={postData?.contentHtml} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // slug에 대한 가능한 값의 목록을 반환합니다.
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  // params.slug를 사용하여 블로그 게시물에 필요한 데이터를 가져옵니다.
  // 다음과 같이 "await" 키워드를 추가합니다.
  const postData = await getPostData(params.slug);
  return {
    props: {
      slug: postData.slug,
      fallback: {
        [unstableSerialize(["Props", postData.slug])]: postData,
      },
    },
  };
};

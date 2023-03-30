import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import useSWR, { unstable_serialize as unstableSerialize } from "swr";
import Layout from "../../components/Layout";
import Section from "../../components/Section";
import { getAllPostSlugs, getPostData } from "../../lib/posts";

interface Props {
  slug: string;
}

export default function Post({ slug }: Props) {
  const { data: postData } = useSWR(["Props", slug]);

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
      <Section slug={slug} />
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

import Layout from "../../components/Layout";
import Head from "next/head";
import { getAllPostSlugs, getPostData } from "../../lib/posts";

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
      <div dangerouslySetInnerHTML={{ __html: postData?.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  // slug에 대한 가능한 값의 목록을 반환합니다.
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // params.slug를 사용하여 블로그 게시물에 필요한 데이터를 가져옵니다.
  // 다음과 같이 "await" 키워드를 추가합니다.
  const postData = await getPostData(params.slug);
  console.log("blog", postData);
  return {
    props: { postData },
  };
}

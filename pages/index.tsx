import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.scss";

export default function Home() {
  return (
    <Layout home>
      {/* 기존 코드를 여기에 유지 */}

      {/* 기존 <section> 태그 아래에 이 <section> 태그를 추가합니다. */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <p>Next.js 공식문서 공부하기!</p>
      </section>
    </Layout>
  );
}

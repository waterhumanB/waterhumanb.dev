import { GetStaticProps } from "next"
import React from "react"
import Layout from "../../components/Layout"
import { getSortedBlogsData } from "../../lib/blogs"
import { IBlog } from "../../types/blog"

import BlogInformation from "../../components/domain/BlogInformation"

const META_DATA = {
  title: "Blog",
  description:
    "개발하면서 느낀점, 생각 등을 공유하거나 복습하고 싶은 기술들을정리하는 곳입니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://waterhumanb.github.io/waterhumanb.dev/blog",
    title:
      "개발하면서 느낀점, 생각 등을 공유하거나 복습하고 싶은 기술들을정리하는 곳입니다.",
    site_name: "waterhumanb.dev",
    images: [
      {
        url: "../../public/thumbnail.png",
        width: 285,
        height: 167,
        alt: "이미지",
      },
    ],
  },
}

function Blog({ allPostsData }: IBlog) {
  return (
    <Layout metaData={META_DATA}>
      <BlogInformation allPostsData={allPostsData} />
    </Layout>
  )
}

export default Blog

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getSortedBlogsData()
  return {
    props: {
      allPostsData,
    },
  }
}

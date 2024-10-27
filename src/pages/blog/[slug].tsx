import { GetStaticPaths, GetStaticProps } from "next"
import useSWR, { unstable_serialize as unstableSerialize } from "swr"
import Layout from "../../components/Layout"
import {
  getAllBlogSlugs,
  getBlogData,
  getSortedBlogsData,
} from "../../lib/blogs"
import { IBlogData } from "../../types/blog"
import PostLayout from "../../components/domain/PostLayout"

interface Props {
  slug: string
  allBlogData: IBlogData[]
}

export default function Post({ slug, allBlogData }: Props) {
  const { data: blogData } = useSWR<IBlogData>(["Props", slug])

  const metaData = {
    title: blogData?.title,
    description: blogData?.description,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: `waterhumanb-blog.vercel.app/blog/${slug}`,
      title: blogData?.title,
      site_name: "waterhumanb.dev",
      images: [
        {
          url: blogData?.thumbnail,
          width: 285,
          height: 167,
          alt: "이미지",
        },
      ],
    },
  }

  return (
    <Layout metaData={metaData}>
      <PostLayout allPostData={allBlogData} postData={blogData} comment />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllBlogSlugs()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const blogData = await getBlogData(params.slug)
  const allBlogData = await getSortedBlogsData()
  return {
    props: {
      slug: blogData.slug,
      allBlogData,
      fallback: {
        [unstableSerialize(["Props", blogData.slug])]: blogData,
      },
    },
  }
}

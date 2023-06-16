import Layout from "../../components/Layout"
import ProjectLayout from "../../components/domain/ProjectLayout"

const META_DATA = {
  title: "Project",
  description:
    "개발을 하면서 팀 또는 개인으로 진행한 프로젝트 저의 작품들을 소개하는 곳입니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "waterhumanb-blog.vercel.app/project",
    title:
      "개발을 하면서 팀 또는 개인으로 진행한 프로젝트 저의 작품들을 소개하는 곳입니다.",
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

function Project() {
  return (
    <Layout metaData={META_DATA}>
      <ProjectLayout />
    </Layout>
  )
}

export default Project

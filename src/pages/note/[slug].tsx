import { GetStaticPaths, GetStaticProps } from "next"
import useSWR, { unstable_serialize as unstableSerialize } from "swr"
import Layout from "../../components/Layout"
import {
  getAllNoteSlugs,
  getNoteData,
  getSortedNotesData,
} from "../../lib/note"
import { INoteData } from "../../types/note"
import PostLayout from "../../components/domain/PostLayout"

interface Props {
  slug: string
  allNoteData: INoteData[]
}

export default function Post({ slug, allNoteData }: Props) {
  const { data: noteData } = useSWR<INoteData>(["Props", slug])

  const metaData = {
    title: noteData?.title,
    description: noteData?.description,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: `https://waterhumanb.github.io/waterhumanb.dev/note/${noteData?.slug}`,
      title: noteData?.title,
      site_name: "waterhumanb.dev",
      images: [
        {
          width: 285,
          height: 167,
          alt: "이미지",
        },
      ],
    },
  }

  return (
    <Layout metaData={metaData}>
      <PostLayout
        allPostData={allNoteData}
        postData={noteData}
        comment={false}
      />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllNoteSlugs()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const noteItem = await getNoteData(params.slug)
  const allNoteData = await getSortedNotesData()
  return {
    props: {
      slug: noteItem.slug,
      allNoteData,
      fallback: {
        [unstableSerialize(["Props", noteItem.slug])]: noteItem,
      },
    },
  }
}

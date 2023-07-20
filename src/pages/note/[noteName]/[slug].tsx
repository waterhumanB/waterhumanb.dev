import { GetStaticPaths, GetStaticProps } from "next"
import useSWR, { unstable_serialize as unstableSerialize } from "swr"
import Layout from "../../../components/Layout"
import {
  getAllNoteSlugs,
  getNoteData,
  getSortedNotesData,
} from "../../../lib/note"
import { INoteData, INoteItem } from "../../../types/note"
import NoteLayout from "../../../components/domain/NoteLayout"
import { ToggleProvider } from "../../../contexts/toggleContext"

interface Props {
  slug: string
  allNoteData: INoteData[]
}

export default function Post({ slug, allNoteData }: Props) {
  const { data: noteItem } = useSWR<INoteItem>(["Props", slug])

  const metaData = {
    title: noteItem?.title,
    description: noteItem?.description,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: `waterhumanb-blog.vercel.app/blog/${noteItem?.slug}`,
      title: noteItem?.title,
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
      <ToggleProvider>
        <NoteLayout allNoteData={allNoteData} noteItem={noteItem} />
      </ToggleProvider>
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
  const noteItem = await getNoteData(params.slug, params.noteName)
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

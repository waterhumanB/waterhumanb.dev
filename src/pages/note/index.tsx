import React from "react"
import { GetStaticProps } from "next"
import { getSortedNotesData } from "../../lib/note"
import Layout from "../../components/Layout"
import { INote } from "../../types/note"
import NoteInformation from "../../components/domain/NoteInformation"

const META_DATA = {
  title: "Note",
  description:
    "개발강의와 개발도서의 내용을 의식적 기록을 통해 학습하고 익힌 내용을 기록합니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://waterhumanb.github.io/waterhumanb.dev/note",
    title:
      "개발강의와 개발도서의 내용을 의식적 기록을 통해 학습하고 익힌 내용을 기록합니다.",
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

function Note({ allNoteData }: INote) {
  return (
    <Layout metaData={META_DATA}>
      <NoteInformation allNoteData={allNoteData} />
    </Layout>
  )
}

export default Note

export const getStaticProps: GetStaticProps = async () => {
  const allNoteData = await getSortedNotesData()
  return {
    props: {
      allNoteData,
    },
  }
}

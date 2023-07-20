import React from "react"
import { GetStaticProps } from "next"
import { getSortedNotesData } from "../../lib/note"
import Layout from "../../components/Layout"
import { INote } from "../../types/note"
import NoteInformation from "../../components/domain/NoteInformation"
import { ToggleProvider } from "../../contexts/toggleContext"

const META_DATA = {
  title: "Note",
  description:
    "개발도서와 개발강의로 학습하고 익힌 내용을 노트에 복습을 목적으로 기록합니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "waterhumanb-blog.vercel.app/note",
    title:
      "개발도서와 개발강의로 학습하고 익힌 내용을 노트에 복습을 목적으로 기록합니다.",
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
      <ToggleProvider>
        <NoteInformation allNoteData={allNoteData} />
      </ToggleProvider>
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

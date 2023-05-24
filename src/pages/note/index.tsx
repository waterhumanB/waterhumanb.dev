import React from "react"
import { GetStaticProps } from "next"
import { getSortedNotesData } from "../../lib/note"
import Layout from "../../components/Layout"
import { INote } from "../../types/note"
import SideBar from "../../components/domain/NoteLayout/SideBar"

function Note({ allNoteData }: INote) {
  return (
    <Layout>
      <SideBar allNoteData={allNoteData} />
      <section>note 소개</section>
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

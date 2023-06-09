import React from "react"
import { GetStaticProps } from "next"
import { getSortedNotesData } from "../../lib/note"
import Layout from "../../components/Layout"
import { INote } from "../../types/note"
import NoteInformation from "../../components/domain/NoteInformation"

function Note({ allNoteData }: INote) {
  return (
    <Layout>
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

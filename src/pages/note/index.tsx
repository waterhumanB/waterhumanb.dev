import React from "react"
import { GetStaticProps } from "next"
import { getSortedNotesData } from "../../lib/note"
import Layout from "../../components/Layout"
import { INote } from "../../types/note"
import SideBar from "../../components/domain/NoteLayout/SideBar"
import styles from "./note.module.scss"
import { useToggleStateContext } from "../../contexts/toggleContext"

function Note({ allNoteData }: INote) {
  const { toggle } = useToggleStateContext()

  return (
    <Layout>
      <div className={styles.noteContainer}>
        <div className={styles.noteBox}>
          <SideBar allNoteData={allNoteData} />
          <section
            className={`${styles.noteInfo} ${
              toggle ? styles.borderBook : styles.borderVideo
            }`}
          >
            <div>
              note information note information note information note
              information note information note information note information
              note information note information note information ?
            </div>
          </section>
        </div>
      </div>
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

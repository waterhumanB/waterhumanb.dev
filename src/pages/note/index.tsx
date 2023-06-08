import React from "react"
import { GetStaticProps } from "next"
import { getSortedNotesData } from "../../lib/note"
import Layout from "../../components/Layout"
import { INote } from "../../types/note"
import SideBar from "../../components/domain/NoteLayout/SideBar"
import styles from "./note.module.scss"
import { useToggleStateContext } from "../../contexts/toggleContext"
import { noteDataFilter } from "../../utils/noteDataFilter"

function Note({ allNoteData }: INote) {
  const { toggle } = useToggleStateContext()

  console.log("book", noteDataFilter(allNoteData, "book"))
  console.log("video", noteDataFilter(allNoteData, "video"))
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
            <article className={styles.noteTitle}>
              <div>
                <h2>Note</h2>
                <p>
                  개발도서와 개발 강의로 학습한 것들을 노트에 필기하듯 배운
                  내용을 정리하는 곳입니다.
                </p>
              </div>
              <div>개발 도서</div>

              <div>개발 강의</div>
            </article>
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

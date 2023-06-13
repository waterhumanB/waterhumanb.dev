import React from "react"
import styles from "./noteInformation.module.scss"
import { INote } from "../../../types/note"
import NoteDropDown from "../NoteDropDown"
import SideBar from "../SideBar"

function NoteInformation({ allNoteData }: INote) {
  return (
    <section>
      <div className={styles.noteContainer}>
        <div className={styles.noteBox}>
          <SideBar allNoteData={allNoteData} />
          <article className={styles.noteTitle}>
            <div className={styles.title}>
              <h2>Note</h2>
              <p>
                개발도서와 개발강의로 학습하고 익힌 내용을 노트에 필기하듯 정리
                및 기록합니다.
              </p>
            </div>
            <div className={styles.noteDropDownBox}>
              <NoteDropDown education='book' allNoteData={allNoteData} />
              <NoteDropDown education='video' allNoteData={allNoteData} />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default NoteInformation

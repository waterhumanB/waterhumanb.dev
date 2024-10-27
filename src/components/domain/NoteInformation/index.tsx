import React from "react"
import Link from "next/link"
import styles from "./noteInformation.module.scss"
import { INote } from "../../../types/note"

function NoteInformation({ allNoteData }: INote) {
  // console.log("noteInfo", allNoteData)
  return (
    <section>
      <div className={styles.noteContainer}>
        <div className={styles.noteBox}>
          <article className={styles.noteTitle}>
            <div className={styles.title}>
              <h1>Note</h1>
              <p>
                개발도서와 개발강의로 학습하고 익힌 내용을 노트에 복습을
                목적으로 기록합니다.
              </p>
            </div>
            <div className={styles.note}>
              {allNoteData.map((data) => (
                <Link
                  className={styles.noteData}
                  key={data.slug}
                  href={`/note/${data.slug}`}
                >
                  <p className={styles.noteName}>{data.title} </p>
                  <p className={styles.noteDateBox}>
                    <p className={styles.noteDate}>
                      <p className={styles.noteStart}>start :&nbsp;</p>
                      <p className={styles.day}>{data.date}</p>
                    </p>
                    {data.endDate && (
                      <p className={styles.noteDate}>
                        <p className={styles.noteEnd}> end :&nbsp;</p>
                        <p className={styles.day}>{data.endDate}</p>
                      </p>
                    )}
                  </p>
                </Link>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default NoteInformation

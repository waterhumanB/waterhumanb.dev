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
                개발강의와 개발도서의 내용을 의식적 기록을 통해 학습하고 익힌
                내용을 기록합니다.
              </p>
            </div>
            <div className={styles.note}>
              {allNoteData.map((data) => (
                <Link
                  className={styles.noteData}
                  key={data.slug}
                  href={`/note/${data.slug}`}
                >
                  <span className={styles.noteName}>{data.title} </span>
                  <div className={styles.noteDateBox}>
                    <div className={styles.noteDate}>
                      <div className={styles.noteStart}>start :&nbsp;</div>
                      <time className={styles.day}>{data.date}</time>
                    </div>
                    {data.endDate && (
                      <div className={styles.noteDate}>
                        <div className={styles.noteEnd}> end :&nbsp;</div>
                        <time className={styles.day}>{data.endDate}</time>
                      </div>
                    )}
                  </div>
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

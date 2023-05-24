import React, { useState, MouseEvent } from "react"
import Link from "next/link"
import styles from "./sideBar.module.scss"

import { INote, INoteData, INoteItem } from "../../../../types/note"

function SideBar({ allNoteData }: INote) {
  const [toggle, setToggle] = useState(true)
  // console.log(
  //   "all",
  //   allNoteData
  //     .flatMap((data) => data.note)
  //     .filter((item) => item.education === "book"),
  // )

  console.log(allNoteData)
  const toggleBtnHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget
    if (name === "book") {
      setToggle(true)
    }
    if (name === "video") {
      setToggle(false)
    }
  }

  return (
    <aside>
      <div
        className={`${styles.toggleBtnBox} ${
          toggle ? styles.bookBorder : styles.videoBorder
        }`}
      >
        <button
          className={`${!toggle ? styles.toggleBtn : styles.toggle}`}
          name='book'
          type='button'
          onClick={toggleBtnHandler}
        >
          BOOK
        </button>
        <button
          className={`${toggle ? styles.toggleBtn : styles.toggle}`}
          name='video'
          type='button'
          onClick={toggleBtnHandler}
        >
          VIDEO
        </button>
        <div
          className={`${styles.toggleDiv} ${
            toggle ? styles.book : styles.video
          }`}
        />
      </div>
      <div>
        {allNoteData.map(({ noteName, note }: INoteData) => {
          return (
            <div key={noteName}>
              {noteName}
              <div>
                {note.map(({ title, slug }: INoteItem) => {
                  return (
                    <div key={title}>
                      <Link href={`/note/${noteName}/${slug}`}>
                        <div>{slug}</div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default SideBar

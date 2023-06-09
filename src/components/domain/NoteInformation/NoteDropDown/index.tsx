import React, { useState, MouseEvent } from "react"
import Link from "next/link"
import { INoteData } from "../../../../types/note"
import { noteDataFilter } from "../../../../utils/noteDataFilter"
import DownArrow from "../../../../../public/assets/icons/downArrow.svg"
import UpArrow from "../../../../../public/assets/icons/upArrow.svg"
import styles from "./noteDropDown.module.scss"

interface NoteDropDownProps {
  education: string
  allNoteData: INoteData[]
}

function NoteDropDown({ education, allNoteData }: NoteDropDownProps) {
  const [dropDown, setDropDown] = useState(
    noteDataFilter(allNoteData, education).map((data) => {
      return { ...data, isDropDown: false }
    }),
  )

  const toggleDropDown = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget
    setDropDown((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note.noteName === name) {
          return {
            ...note,
            isDropDown: !note.isDropDown,
          }
        }
        return note
      })
      return updatedNotes
    })
  }

  return (
    <div className={styles.dropDownContainer}>
      <div className={styles.dropDownTitle}>
        {education === "book" ? "Development 도서" : "Development 강의"}
      </div>
      {dropDown.map((data) => {
        return (
          <div key={data.noteName}>
            <button
              className={`${styles.dropDown} ${
                education === "book" ? styles.bookColor : styles.videoColor
              }`}
              type='button'
              name={data.noteName}
              onClick={toggleDropDown}
            >
              <p>{data.noteName}</p>
              {data.isDropDown ? <UpArrow /> : <DownArrow />}
            </button>
            {data.isDropDown &&
              data.note.map((item) => {
                return (
                  <div key={item.title}>
                    {/* <Link href={`/note/${data.noteName}/${item.slug}`}>
                   
                  </Link> */}
                    <div>{item.slug}</div>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

export default NoteDropDown

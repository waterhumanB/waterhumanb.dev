import React from "react"
import Link from "next/link"
import { INoteData } from "../../../types/note"
import DownArrow from "../../../../public/assets/icons/downArrow.svg"
import UpArrow from "../../../../public/assets/icons/upArrow.svg"
import styles from "./noteDropDown.module.scss"
import { useDropDownNote } from "../../../hooks/useDropDownNote"

interface NoteDropDownProps {
  education: string
  allNoteData: INoteData[]
}

function NoteDropDown({ education, allNoteData }: NoteDropDownProps) {
  const { dropDown, toggleDropDown } = useDropDownNote(allNoteData, education)

  return (
    <div className={styles.dropDownContainer}>
      <div className={styles.dropDownTitle}>
        {education === "book" ? "Development Books" : "Development Video"}
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
              data.note.map((item, idx) => {
                return (
                  <div key={item.slug}>
                    <Link
                      className={`${
                        education === "book"
                          ? styles.bookHover
                          : styles.videoHover
                      }`}
                      href={`/note/${data.noteName}/${item.slug}`}
                    >
                      <div className={styles.noteItem}>{`${idx + 1}. ${
                        item.slug
                      }`}</div>
                    </Link>
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

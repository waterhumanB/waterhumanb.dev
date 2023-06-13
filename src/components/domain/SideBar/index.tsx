import React from "react"
import Link from "next/link"
import styles from "./sideBar.module.scss"
import { INote } from "../../../types/note"
import ToggleBtn from "./ToggleBtn"
import { useToggleStateContext } from "../../../contexts/toggleContext"
import { noteDataFilter } from "../../../utils/noteDataFilter"
import { useDropDownNote } from "../../../hooks/useDropDownNote"

function SideBar({ allNoteData }: INote) {
  const { toggle } = useToggleStateContext()
  const { dropDown, toggleDropDown } = useDropDownNote(
    noteDataFilter(allNoteData, toggle ? "book" : "video"),
    toggle ? "book" : "video",
  )

  return (
    <aside className={styles.sideBarContainer}>
      <ToggleBtn />
      <div className={styles.sideBar}>
        {dropDown.map((data) => {
          return (
            <div className={styles.dropDownBox} key={data.noteName}>
              <button
                className={`${styles.dropDown} ${
                  toggle ? styles.bookColor : styles.videoColor
                }`}
                type='button'
                name={data.noteName}
                onClick={toggleDropDown}
              >
                <p className={styles.arrow}>{data.isDropDown ? "⎖ " : "➤ "}</p>
                <p>{data.noteName}</p>
              </button>
              {data.isDropDown &&
                data.note.map((item, idx) => {
                  return (
                    <div key={item.slug}>
                      <Link
                        className={`${
                          toggle ? styles.bookHover : styles.videoHover
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
    </aside>
  )
}

export default SideBar

import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./sideBar.module.scss"
import { INote } from "../../../types/note"
import ToggleBtn from "./ToggleBtn"
import {
  useToggleDispatch,
  useToggleStateContext,
} from "../../../contexts/toggleContext"
import { noteDataFilter } from "../../../utils/noteDataFilter"
import { useDropDownNote } from "../../../hooks/useDropDownNote"

function SideBar({ allNoteData }: INote) {
  const router = useRouter()
  const dispatch = useToggleDispatch()
  const { toggle } = useToggleStateContext()

  const education = toggle ? "book" : "video"

  const { dropDown, toggleDropDown } = useDropDownNote(
    noteDataFilter(allNoteData, education),
    education,
  )

  useEffect(() => {
    const educationMenu = allNoteData.filter(
      (data) => data.noteName === router?.query?.noteName,
    )[0]?.note[0].education

    if (educationMenu === "video") {
      dispatch({ type: "video", toggle: false })
    }
    if (educationMenu === "book") {
      dispatch({ type: "book", toggle: true })
    }
  }, [router])

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
                } ${
                  data.noteName === router?.query?.noteName &&
                  (toggle ? styles.bookBackground : styles.videoBackground)
                } ${
                  (toggle && data.isDropDown && styles.bookBackground) ||
                  (!toggle && data.isDropDown && styles.videoBackground)
                }`}
                type='button'
                name={data.noteName}
                onClick={toggleDropDown}
              >
                <p className={styles.arrow}>{data.isDropDown ? "⎖ " : "➤ "}</p>
                <p>{data.noteName.replaceAll("-", " ")}</p>
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
                        <div
                          className={`${styles.noteItem} ${
                            item.slug === router?.query?.slug &&
                            (toggle
                              ? styles.bookTextColor
                              : styles.videoTextColor)
                          }`}
                        >
                          <div>{`${idx + 1}.`}</div>
                          <div>{item.title}</div>
                        </div>
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

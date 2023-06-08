import React from "react"
import Link from "next/link"
import styles from "./sideBar.module.scss"

import { INote, INoteData, INoteItem } from "../../../../types/note"
import ToggleBtn from "./ToggleBtn"
import { useToggleStateContext } from "../../../../contexts/toggleContext"
import { noteDataFilter } from "../../../../utils/noteDataFilter"

function SideBar({ allNoteData }: INote) {
  const { toggle } = useToggleStateContext()

  return (
    <aside className={styles.sideBarContainer}>
      <ToggleBtn />
      <div className={styles.sideBar}>
        {noteDataFilter(allNoteData, toggle ? "book" : "video").map(
          ({ noteName, note }: INoteData) => {
            return (
              <div className={styles.noteData} key={noteName}>
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
          },
        )}
      </div>
    </aside>
  )
}

export default SideBar

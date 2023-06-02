import React from "react"
import Link from "next/link"
import styles from "./sideBar.module.scss"

import { INote, INoteData, INoteItem } from "../../../../types/note"
import ToggleBtn from "./ToggleBtn"
import { useToggleBtn } from "../../../../hooks/useToggleBtn"

function SideBar({ allNoteData }: INote) {
  const { toggle, toggleBtnHandler } = useToggleBtn("toggle", true)

  const noteDataFilter = (noteData: INoteData[], toggleValue: boolean) => {
    const toggleList = noteData
      .flatMap((data) => data.note)
      .filter((item) =>
        toggleValue ? item.education === "book" : item.education === "video",
      )
    const filter = noteData.filter((data) =>
      data.note.some((item: INoteItem) => toggleList.includes(item)),
    )

    return filter
  }

  return (
    <aside className={styles.sideBarContainer}>
      <ToggleBtn toggle={toggle} toggleBtnHandler={toggleBtnHandler} />
      <div className={styles.sideBar}>
        {noteDataFilter(allNoteData, toggle).map(
          ({ noteName, note }: INoteData) => {
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
          },
        )}
      </div>
    </aside>
  )
}

export default SideBar

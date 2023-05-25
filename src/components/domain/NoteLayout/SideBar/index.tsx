import React from "react"
import Link from "next/link"
// import styles from "./sideBar.module.scss"

import { INote, INoteData, INoteItem } from "../../../../types/note"
import ToggleBtn from "./ToggleBtn"
import { useToggleBtn } from "../../../../hooks/useToggleBtn"

function SideBar({ allNoteData }: INote) {
  const { toggle, toggleBtnHandler } = useToggleBtn("toggle", true)
  const filter = allNoteData
    .flatMap((data) => data.note)
    .filter((item) => item.education === "book")

  console.log("all", filter)

  console.log("note", allNoteData)
  console.log(
    "filter",
    allNoteData.filter((data) =>
      data.note.some((item: INoteItem) => filter.includes(item)),
    ),
  )

  return (
    <aside>
      <ToggleBtn toggle={toggle} toggleBtnHandler={toggleBtnHandler} />
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

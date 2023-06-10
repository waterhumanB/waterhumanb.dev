import { useState, MouseEvent } from "react"
import { noteDataFilter } from "../utils/noteDataFilter"
import { INoteData } from "../types/note"

export const useDropDownNote = (
  allNoteData: INoteData[],
  education: string,
) => {
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

  return { dropDown, toggleDropDown }
}

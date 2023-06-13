import { useState, MouseEvent, useEffect } from "react"
import { noteDataFilter } from "../utils/noteDataFilter"
import { INoteData, INoteDropDown } from "../types/note"

export const useDropDownNote = (
  allNoteData: INoteData[],
  education: string,
) => {
  const [dropDown, setDropDown] = useState<INoteDropDown[]>([])

  useEffect(() => {
    const filteredData = noteDataFilter(allNoteData, education)
    const updatedDropDown = filteredData.map((data) => ({
      ...data,
      isDropDown: false,
    }))
    setDropDown(updatedDropDown)
  }, [education])

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

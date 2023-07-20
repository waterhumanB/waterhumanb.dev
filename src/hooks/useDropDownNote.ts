import { useState, MouseEvent, useEffect } from "react"
import { useRouter } from "next/router"
import { noteDataFilter } from "../utils/noteDataFilter"
import { INoteData, INoteDropDown } from "../types/note"

export const useDropDownNote = (
  allNoteData: INoteData[],
  education: string,
) => {
  const [dropDown, setDropDown] = useState<INoteDropDown[]>([])

  const router = useRouter()

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

  useEffect(() => {
    const filteredData = noteDataFilter(allNoteData, education)
    const updatedDropDown = filteredData.map((data) => ({
      ...data,
      isDropDown: data.noteName === router?.query?.noteName,
    }))
    setDropDown(updatedDropDown)
  }, [education, router])

  return { dropDown, toggleDropDown }
}

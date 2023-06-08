import { INoteData, INoteItem } from "../types/note"

export const noteDataFilter = (noteData: INoteData[], education: string) => {
  const toggleList = noteData
    .flatMap((data) => data.note)
    .filter((item) => item.education === education)

  const filter = noteData.filter((data) =>
    data.note.some((item: INoteItem) => toggleList.includes(item)),
  )

  return filter
}

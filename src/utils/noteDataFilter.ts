import { INoteData } from "../types/note"

export const noteDataFilter = (noteData: INoteData[], education: string) => {
  // education 필드가 주어진 값과 일치하는 데이터만 필터링
  const filter = noteData.filter((data) => data.education === education)

  return filter
}

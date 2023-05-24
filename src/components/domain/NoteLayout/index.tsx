import { INoteData, INoteItem } from "../../../types/note"
import Title from "../../Layout/Title"
import Section from "../Article"
import SideBar from "./SideBar"

interface Props {
  allNoteData: INoteData[]
  noteItem: INoteItem | undefined
}

function NoteLayout({ allNoteData, noteItem }: Props) {
  // console.log("all", allNoteData)
  // console.log("data", noteItem)
  return (
    <div>
      <SideBar allNoteData={allNoteData} />
      <div>
        <Title title={noteItem?.title} />
        <Section slug={noteItem?.slug} />
      </div>
    </div>
  )
}

export default NoteLayout

import { useToggleStateContext } from "../../../contexts/toggleContext"
import { INoteData, INoteItem } from "../../../types/note"
import Title from "../../Layout/Title"
import Section from "../Article"
import SideBar from "./SideBar"
import styles from "./noteLayout.module.scss"

interface Props {
  allNoteData: INoteData[]
  noteItem: INoteItem | undefined
}

function NoteLayout({ allNoteData, noteItem }: Props) {
  const { toggle } = useToggleStateContext()

  return (
    <div className={styles.noteContainer}>
      <section className={styles.noteBox}>
        <SideBar allNoteData={allNoteData} />
        <div
          className={`${styles.note} ${
            toggle ? styles.borderBook : styles.borderVideo
          }`}
        >
          <Title title={noteItem?.title} />
          <Section slug={noteItem?.slug} />
        </div>
      </section>
    </div>
  )
}

export default NoteLayout

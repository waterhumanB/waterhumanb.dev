import {
  useToggleDispatch,
  useToggleStateContext,
} from "../../../../../contexts/toggleContext"
import styles from "./toggleBtn.module.scss"

function ToggleBtn() {
  const { toggle } = useToggleStateContext()
  const dispatch = useToggleDispatch()

  const setBook = () => dispatch({ type: "Book", toggle: true })
  const setVideo = () => dispatch({ type: "Video", toggle: false })

  return (
    <div className={styles.toggleBtnBox}>
      <button
        className={`${!toggle ? styles.toggleBtn : styles.toggle}`}
        name='book'
        type='button'
        onClick={setBook}
      >
        BOOK
      </button>
      <button
        className={`${toggle ? styles.toggleBtn : styles.toggle}`}
        name='video'
        type='button'
        onClick={setVideo}
      >
        VIDEO
      </button>

      <div
        className={`${styles.toggleDiv} ${toggle ? styles.book : styles.video}`}
      />
    </div>
  )
}

export default ToggleBtn

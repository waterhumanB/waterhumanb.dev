import React, { MouseEventHandler } from "react"
import styles from "./toggleBtn.module.scss"

interface Props {
  toggle: boolean
  toggleBtnHandler: MouseEventHandler<HTMLButtonElement>
}

function ToggleBtn({ toggle, toggleBtnHandler }: Props) {
  return (
    <div
      className={`${styles.toggleBtnBox} ${
        toggle ? styles.bookBorder : styles.videoBorder
      }`}
    >
      <button
        className={`${!toggle ? styles.toggleBtn : styles.toggle}`}
        name='book'
        type='button'
        onClick={toggleBtnHandler}
      >
        BOOK
      </button>
      <button
        className={`${toggle ? styles.toggleBtn : styles.toggle}`}
        name='video'
        type='button'
        onClick={toggleBtnHandler}
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

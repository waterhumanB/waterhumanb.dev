import React from "react"
import styles from "./errorPage.module.scss"

function ErrorPage() {
  return (
    <section className={styles.container}>
      <span>
        <p>현재 페이지를 찾을 수 없습니다. 다른 페이지로 이동해주세요!</p>
      </span>
    </section>
  )
}

export default ErrorPage

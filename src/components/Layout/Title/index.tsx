import styles from "./title.module.scss"

interface Props {
  title: string | undefined
  date?: string | undefined
  endDate?: string | undefined
}

function Title({ title, date, endDate }: Props) {
  return (
    <header className={styles.container}>
      <h1>{title}</h1>
      {!endDate && <span>{date}</span>}
      {endDate && (
        <span>
          {date} ~ {endDate}
        </span>
      )}
    </header>
  )
}

export default Title

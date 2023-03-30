import styles from "./title.module.scss";

interface TitleProps {
  title: string | undefined;
  category: string | undefined;
}

function Title({ title, category }: TitleProps) {
  return (
    <header className={styles.container}>
      <div>{category}</div>
      <h1>{title}</h1>
    </header>
  );
}

export default Title;

import useSWR from "swr";

import React from "react";

import styles from "./section.module.scss";
import Content from "./Content";
import { IPostData } from "../../types/post";

interface Props {
  slug: string;
}

function Section({ slug }: Props) {
  const { data: post } = useSWR<IPostData>(["Props", slug]);

  return (
    <article className={styles.container}>
      <time className={styles.date}>{post?.date}</time>
      <Content content={post?.content} />
    </article>
  );
}

export default Section;

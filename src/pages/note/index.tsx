import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getSortedNotesData } from "../../lib/note";
import Layout from "../../components/Layout";
import { IPost } from "../../types/post";

function Note({ allNotesData }: IPost) {
  // map 컴포넌트 뺴주기
  return (
    <Layout>
      <h2>Note!</h2>
      <main>
        <ul>
          {allNotesData.map(({ noteName, note }: any) => {
            return (
              <li key={noteName}>
                {noteName}
                <div>
                  {note.map(({ title, slug }: any) => {
                    return (
                      <div key={title}>
                        <Link href={`/note/${noteName}/${slug}`}>
                          <div>{title}</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </Layout>
  );
}

export default Note;

export const getStaticProps: GetStaticProps = () => {
  const allNotesData = getSortedNotesData();
  return {
    props: {
      allNotesData,
    },
  };
};

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
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {allNotesData.map(({ noteName, note }: any) => {
            return (
              <li key={noteName}>
                {noteName}
                <div>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {note.map(({ title, slug }: any) => {
                    return (
                      <div key={title}>
                        <Link href={`/note/${noteName}/${slug}`}>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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

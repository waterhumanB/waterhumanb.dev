import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getSortedNotesData } from "../../lib/note";
import Layout from "../../components/Layout";
import { INote, INoteData, INoteItem } from "../../types/note";

function Note({ allNoteData }: INote) {
  return (
    <Layout>
      <main>
        <ul>
          {allNoteData.map(({ noteName, note }: INoteData) => {
            return (
              <li key={noteName}>
                {noteName}
                <div>
                  {note.map(({ title, slug }: INoteItem) => {
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
  const allNoteData = getSortedNotesData();
  return {
    props: {
      allNoteData,
    },
  };
};

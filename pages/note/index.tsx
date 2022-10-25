import React from "react";
import Link from "next/link";
import { getSortedNotesData } from "../../lib/note";
import Layout from "../../components/Layout";

const Note = ({ allNotesData }: any) => {
  // map 컴포넌트 뺴주기
  return (
    <Layout home>
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
                          <a>{title}</a>
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
};

export default Note;

export async function getStaticProps({ params }: any) {
  const allNotesData = getSortedNotesData();
  return {
    props: {
      allNotesData,
    },
  };
}

import React from "react";
import Link from "next/link";

import { INote, INoteData, INoteItem } from "../../../types/note";

function SideBar({ allNoteData }: INote) {
  return (
    <nav>
      <div>
        {allNoteData.map(({ noteName, note }: INoteData) => {
          return (
            <div key={noteName}>
              {noteName}
              <div>
                {note.map(({ title, slug }: INoteItem) => {
                  return (
                    <div key={title}>
                      <Link href={`/note/${noteName}/${slug}`}>
                        <div>{slug}</div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default SideBar;

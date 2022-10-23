import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsNoteFileDirectory = path.join(process.cwd(), "posts/note");
const postsNoteDirectory = (file: string) => {
  return path.join(process.cwd(), `posts/note/${file}`);
};

export function getSortedNotesData() {
  const fileNames = fs.readdirSync(postsNoteFileDirectory);
  const allPostsData = fileNames.map(fileName => {
    const noteName = postsNoteDirectory(fileName).split("\\")[8];

    const nowFile = path.join(process.cwd(), `posts/note/${noteName}`);

    const fileContents = fs.readdirSync(nowFile, "utf8").map(data => {
      const mdFile = fs.readFileSync(`posts/note/${noteName}/${data}`, "utf8");

      const matterResult = matter(mdFile);
      return matterResult.data;
    });

    const realFileContents = fileContents.sort(
      ({ date: a }: any, { date: b }: any) => {
        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        } else {
          return 0;
        }
      },
    );

    return {
      noteName: [...realFileContents],
    };
  });
  return allPostsData;
}

export function getAllNoteSlugs() {
  const fileNames = fs.readdirSync(postsNoteFileDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        note: {
          slug: fileName.replace(/\.md$/, ""),
        },
      },
    };
  });
}

export async function getNoteData(slug: string) {
  const pathName = "";
  const fullPath = path.join(
    postsNoteDirectory(pathName.replace(/\*/, "")),
    `${slug}.md`,
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // gary-matter을 사용하여 게시물 메타데이터 섹션 구문 분석
  const matterResult = matter(fileContents);

  // remark를 사용하여 마크다운을 HTML 문자열로 변환
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 데이터를 slug 및 contentHtml과 결합
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}

import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsNoteFileDirectory = path.join(process.cwd(), "posts/note")

export function getSortedNotesData() {
  const fileNames = fs.readdirSync(postsNoteFileDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsNoteFileDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)
    return {
      slug,
      ...matterResult.data,
    }
  })
  return allPostsData.sort(({ date: a }: any, { date: b }: any) =>
    a > b ? -1 : 1,
  )
}

export function getAllNoteSlugs() {
  const fileNames = fs.readdirSync(postsNoteFileDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    }
  })
}

export async function getNoteData(slug: string) {
  const fullPath = path.join(postsNoteFileDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const matterResult = matter(fileContents)
  const { content } = matterResult
  return {
    slug,
    content,
    ...matterResult.data,
  }
}

// export function getSortedNotesData() {
//   const fileNames = fs.readdirSync(postsNoteFileDirectory)
//   const allNotesData = fileNames.map((fileName) => {
//     const nowFile = path.join(process.cwd(), `posts/note/${fileName}`)
//     const noteName = fileName
//     const fileContents = fs.readdirSync(nowFile, "utf8").map((data) => {
//       const mdFile = fs.readFileSync(`posts/note/${fileName}/${data}`, "utf8")

//       const slug = data.replace(/\.md$/, "")

//       const matterResult = matter(mdFile)

//       return {
//         slug,
//         ...matterResult.data,
//       }
//     })
//     const realFileContents = fileContents.sort(
//       ({ date: a }: any, { date: b }: any) => (a > b ? 1 : -1),
//     )

//     return {
//       noteName,
//       note: [...realFileContents],
//     }
//   })
//   return allNotesData
// }

// export function getAllNoteSlugs() {
//   const fileNames = fs.readdirSync(postsNoteFileDirectory)
//   const allNotesSlugData = fileNames.map((fileName) => {
//     const nowFile = path.join(process.cwd(), `posts/note/${fileName}`)
//     const fileContents = fs.readdirSync(nowFile, "utf8").map((data) => {
//       const slug = data.replace(/\.md$/, "")
//       const noteName = fileName
//       return {
//         params: {
//           noteName,
//           slug,
//         },
//       }
//     })
//     return fileContents
//   })
//   return allNotesSlugData.flat()
// }

// export async function getNoteData(slug: string, noteName: string) {
//   const fullPath = path.join(postsNoteFileDirectory, `${noteName}/${slug}.md`)
//   const fileContents = fs.readFileSync(fullPath, "utf8")
//   const matterResult = matter(fileContents)
//   const { content } = matterResult

//   return {
//     slug,
//     content,
//     ...matterResult.data,
//   }
// }

import { IBlogData } from "../../../types/blog"
import { INoteData } from "../../../types/note"
import Title from "../../Layout/Title"
import Section from "../Article"
import Giscus from "../Giscus"
import SideBar from "../SideBar"
import TOC from "../TOC"
import styles from "./postLayout.module.scss"

interface Props {
  allPostData: INoteData[] | IBlogData[]
  postData: INoteData | IBlogData | undefined
  comment: boolean
}

function PostLayout({ allPostData, postData, comment }: Props) {
  return (
    <div>
      <div className={styles.postContainer}>
        <SideBar allPostData={allPostData} />
        <div className={styles.postBox}>
          <Title
            title={postData?.title}
            date={postData?.date}
            endDate={postData?.endDate}
          />
          <Section slug={postData?.slug} />
          {comment && (
            <div className={styles.comment}>
              <Giscus />
            </div>
          )}
        </div>
        <TOC postData={postData} />
      </div>
    </div>
  )
}

export default PostLayout

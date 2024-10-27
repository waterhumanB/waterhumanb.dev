import { IBlogData } from "../types/blog"

export const categoryFilter = (postData: IBlogData[]) => {
  const mapping = postData.map((data) => data.category)

  return postData
    .filter((data, index) => mapping.indexOf(data.category) === index)
    .map((data) => data.category)
}

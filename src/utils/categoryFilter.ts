import { IPostData } from "../types/post";

export const categoryFilter = (postData: IPostData[]) => {
  const mapping = postData.map((data) => data.category);

  return postData
    .filter((data, index) => mapping.indexOf(data.category) === index)
    .map((data) => data.category);
};

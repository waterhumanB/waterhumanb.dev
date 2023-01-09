import { ReactElement } from "react";

export interface IPost {
  [key: string]: [string];
}

export interface IPostData {
  slug: string;
  contentHtml?: ReactElement;
  title: string;
  date: string;
  desciption: string;
  thumbnail?: string;
  category?: string;
  index?: number;
}

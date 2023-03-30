import { ReactElement } from "react";

export interface IPost {
  [key: string]: [string];
}

export interface IPostData {
  slug: string;
  content?: ReactElement;
  title: string;
  date: string;
  description: string;
  thumbnail?: string;
  category?: string;
  index?: number;
}

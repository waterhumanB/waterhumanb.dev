export interface IPost {
  [key: string]: IPostData[];
}
export interface IPostData {
  slug: string;
  content?: string;
  title: string;
  date: string;
  description: string;
  thumbnail?: string;
  category?: string;
}

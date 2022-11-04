export interface IPost {
  [key: string]: [string];
}

export interface IPostData {
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentHtml: any;
  title: string;
  date: string;
  desciption: string;
  thumbnail?: string;
  category?: string;
}

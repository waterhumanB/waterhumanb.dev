export interface IBlog {
  [key: string]: IBlogData[]
}
export interface IBlogData {
  slug: string
  content?: string
  title: string
  date: string
  description?: string
  thumbnail?: string
  category?: string
  update?: string
  endDate?: string
}

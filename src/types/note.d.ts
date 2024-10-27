export interface INote {
  [key: string]: INoteData[]
}

export interface INoteData {
  slug: string
  title?: string
  date?: string
  endDate?: string
  description?: string
  education?: string
  content?: string
}

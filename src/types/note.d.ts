export interface INote {
  [key: string]: INoteData[]
}

export interface INoteData {
  noteName: string
  note: NoteItem[]
}

export interface INoteItem {
  slug: string
  title?: string
  date?: string
  description?: string
  education?: string
  content?: string
}

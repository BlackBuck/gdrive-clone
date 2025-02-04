export type FileType = "folder" | "document" | "image" | "video" | "audio" | "pdf"

export interface FileItem {
  id: string
  name: string
  type: FileType
  size: string
  modified: string
  parent: string
  url: string
}

export interface Folder {
  id: string
  name: string
  type: "folder"
  parent: string | null
}


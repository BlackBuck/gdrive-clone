export type FileType = "folder" | "document" | "image" | "video" | "audio" | "pdf"

export interface FileItem {
  id: string
  name: string
  type: FileType
  size?: string
  modified: string
  parentId: string | null
}

export interface Folder extends FileItem {
  type: "folder"
}


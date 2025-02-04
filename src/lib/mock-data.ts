import type { FileItem, Folder } from "./types"

export const mockFolders: Folder[] = [
  {id: "root", name: "root", type: "folder", parent: null},
  {id: "1", name: "Documents", type: "folder", parent: "root"},
  {id: "2", name: "Images", type: "folder", parent: "root"},
  {id: "3", name: "Work", type: "folder", parent: "root"},
]

export const mockFiles: FileItem[] = [
  {
    id: "4", 
    name: "Resume.pdf",
    type: "document",
    url: "/files/resume.pdf",
    parent: "root", 
    size: "1.2 MB",
    modified: "03-02-2025",
  },
  {
    id: "5",
    name: "presentation.pptx",
    type: "document",
    url: "/files/presentation.xlsx",
    parent: "3",
    size: "4.5 MB",
    modified: "03-02-2025"
  }
]
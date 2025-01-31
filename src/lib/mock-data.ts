import type { FileItem } from "./types"

export const mockFiles: FileItem[] = [
  { id: "root", name: "My Drive", type: "folder", modified: "2023-05-01", parentId: null },
  { id: "1", name: "Documents", type: "folder", modified: "2023-05-01", parentId: "root" },
  { id: "2", name: "Images", type: "folder", modified: "2023-05-02", parentId: "root" },
  { id: "3", name: "Videos", type: "folder", modified: "2023-05-03", parentId: "root" },
  { id: "4", name: "Resume.pdf", type: "pdf", size: "1.2 MB", modified: "2023-05-04", parentId: "1" },
  { id: "5", name: "Project Proposal.docx", type: "document", size: "567 KB", modified: "2023-05-05", parentId: "1" },
  { id: "6", name: "Vacation.jpg", type: "image", size: "3.4 MB", modified: "2023-05-06", parentId: "2" },
  { id: "7", name: "Family Photo.png", type: "image", size: "2.1 MB", modified: "2023-05-07", parentId: "2" },
  { id: "8", name: "Tutorial.mp4", type: "video", size: "45 MB", modified: "2023-05-08", parentId: "3" },
  { id: "9", name: "Song.mp3", type: "audio", size: "5.6 MB", modified: "2023-05-09", parentId: "root" },
]


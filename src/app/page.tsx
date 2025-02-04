"use client"

import { useState } from "react"
import type { FileItem, Folder } from "~/lib/types"
import { mockFiles, mockFolders } from "~/lib/mock-data"
import { Button } from "~/components/ui/button"
import { Upload, File, FolderIcon, Image, Video, Music, FileText } from "lucide-react"
import { FileRow, FolderRow } from "./file-row"

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<Folder>({
    id: "root",
    name: "My Drive",
    type: "folder",
    parent: null,
  })
  const [breadcrumbs, setBreadcrumbs] = useState<Folder[]>([currentFolder])

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder.id)
  }

  const getCurrentFolders = () => {
    return mockFolders.filter((folder) => folder.parent === currentFolder.id)
  }

  const handleFolderClick = (folder: Folder) => {
    setCurrentFolder(folder)
    setBreadcrumbs([...breadcrumbs, folder])
  }

  const handleBreadcrumbClick = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    const lastFolder = newBreadcrumbs[newBreadcrumbs.length - 1]
    if (lastFolder) {
      setCurrentFolder(lastFolder)
      setBreadcrumbs(newBreadcrumbs)
    } else {
      // If for some reason we don't have a valid folder, reset to root
      const rootFolder = mockFiles.find((file) => file.id === "root") as Folder
      setCurrentFolder(rootFolder)
      setBreadcrumbs([rootFolder])
    }
  }

  const getFileIcon = (type: FileItem["type"]) => {
    switch (type) {
      case "folder":
        return <FolderIcon className="w-6 h-6" />
      case "document":
        return <FileText className="w-6 h-6" />
      case "image":
        return <Image className="w-6 h-6" />
      case "video":
        return <Video className="w-6 h-6" />
      case "audio":
        return <Music className="w-6 h-6" />
      default:
        return <File className="w-6 h-6" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Google Drive Clone</h1>

      {/* Breadcrumb navigation */}
      <nav className="flex mb-4">
        {breadcrumbs.map((folder, index) => (
          <div key={folder.id} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <button onClick={() => handleBreadcrumbClick(index)} className="text-blue-400 hover:underline">
              {folder.name}
            </button>
          </div>
        ))}
      </nav>

      {/* Upload button */}
      <div className="mb-4">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      {/* File list */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 font-semibold">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Size</div>
          <div className="col-span-3">Last Modified</div>
        </div>
        {FolderRow({folders: getCurrentFolders(), handleFolderClick: handleFolderClick})}
        {FileRow({files: getCurrentFiles()})}
      </div>
    </div>
  )
}


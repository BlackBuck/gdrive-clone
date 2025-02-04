import { useState } from "react"
import type { FileItem, Folder } from "~/lib/types"
import { File, FolderIcon, Image, Video, Music, FileText } from "lucide-react"
import Link from "next/link"


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

export function FileRow(props: {files: FileItem[]}) {
    const [currentFolder, setCurrentFolder] = useState<Folder>({
        id: "root",
        name: "My Drive",
        type: "folder",
        parent: null,
      })
    const [breadcrumbs, setBreadcrumbs] = useState<Folder[]>([currentFolder])
      
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
        {props.files.map((file) => (
          <div key={file.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-700 transition-colors">
            <div className="col-span-6 flex items-center">
              {getFileIcon(file.type)}
              <Link href="#" className="ml-2 hover:underline">
                  {file.name}
                </Link>
            </div>
            <div className="col-span-3">{file.size ?? "-"}</div>
            <div className="col-span-3">{file.modified}</div>
          </div>
        ))}
        
      </div>
  )
}

export function FolderRow(props: {folders: Folder[], handleFolderClick: Function}) {
    const [currentFolder, setCurrentFolder] = useState<Folder>({
        id: "root",
        name: "My Drive",
        type: "folder",
        parent: null,
      })
      const [breadcrumbs, setBreadcrumbs] = useState<Folder[]>([currentFolder])
      
      
      
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
            {props.folders.map((file) => (
              <div key={file.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-700 transition-colors">
                <div className="col-span-6 flex items-center">
                  {getFileIcon(file.type)}
                  <button onClick={() => props.handleFolderClick(file as Folder)} className="ml-2 hover:underline">
                      {file.name}
                    </button>
                </div>
              </div>
            ))}
            
          </div>
      )
}
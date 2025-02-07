import type { FileItem } from "~/lib/types"
import { File, FolderIcon, Image, Video, Music, FileText } from "lucide-react"
import Link from "next/link"
import type { DB_FileType, DB_FolderType } from "~/server/db/schema"


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

export function FileRow(props: {files: DB_FileType[]}) {
      
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
        {props.files.map((file) => (
          <div key={file.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-700 transition-colors">
            <div className="col-span-6 flex items-center">
              {getFileIcon("document")}
              <a target="_blank" href={file.url} className="ml-2 hover:underline" download>
                  {file.name}
                </a>
            </div>
            <div className="col-span-3">{`${file.size/(1e6)} MB` || "-"}</div>
            <div className="col-span-3">{file.createdAt.getDate() + "/" +file.createdAt.getUTCMonth() + "/" +file.createdAt.getFullYear()}</div>
          </div>
        ))}
        
      </div>
  )
}

export function FolderRow(props: {folders: DB_FolderType[]}) {
      
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
            {props.folders.map((folder) => (
              <div key={folder.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-700 transition-colors">
                <div className="col-span-6 flex items-center">
                  {getFileIcon("folder")}
                  <Link href={`/f/${folder.id}`} className="ml-2 hover:underline">
                      {folder.name}
                    </Link>
                </div>
                <div className="col-span-3">{"-"}</div>
            <div className="col-span-3">{folder.createdAt.getDate() + "/" + folder.createdAt.getUTCMonth() + "/" + folder.createdAt.getFullYear()}</div>
              </div>
            ))}
            
          </div>
      )
}
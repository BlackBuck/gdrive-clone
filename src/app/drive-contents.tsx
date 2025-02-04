"use client"

import { useState } from "react"
import { folders, files } from "~/server/db/schema"
import { Button } from "~/components/ui/button"
import { Upload } from "lucide-react"
import { FileRow, FolderRow } from "./file-row"
import Link from "next/link"

export default function DriveContents(props: {
    files: typeof files.$inferSelect[]
    folders: typeof folders.$inferSelect[]
    parents: typeof folders.$inferSelect[]
}) {
  const [breadcrumbs, setBreadCrumbs] = useState<typeof folders.$inferSelect[]>(props.parents.reverse());

  

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Google Drive Clone</h1>

      {/* Breadcrumb navigation */}
      <nav className="flex mb-4">
        {breadcrumbs.map((folder, index)=> (
           <div key={`${folder.id}`} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <Link href={`/f/${folder.id}`} className="text-blue-400 hover:underline">
              {index === 0 ? "My Drive" : folder.name}
          </Link>
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
        {FolderRow({folders: props.folders})}
        {FileRow({files: props.files})}
      </div>
    </div>
  )
}


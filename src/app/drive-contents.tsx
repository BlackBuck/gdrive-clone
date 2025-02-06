"use client"

import { useState } from "react"
import { folders_table, files_table } from "~/server/db/schema"
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs"
import { FileRow, FolderRow } from "./file-row"
import Link from "next/link"
import { UploadButton } from "~/components/ui/uploadthing"
import { useRouter } from "next/navigation"

export default function DriveContents(props: {
    files: typeof files_table.$inferSelect[]
    folders: typeof folders_table.$inferSelect[]
    parents: typeof folders_table.$inferSelect[]
}) {
  const [breadcrumbs, setBreadCrumbs] = useState<typeof folders_table.$inferSelect[]>(props.parents.reverse());

  const navigate = useRouter();
  

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Google Drive Clone</h1>

      {/* Breadcrumb navigation */}
      <nav className="grid grid-cols-2 min-w-screen mb-4">
        <div className="flex items-start">
        {breadcrumbs.map((folder, index)=> (
           <div key={`${folder.id}`} className="flex items-start">
            {index > 0 && <span className="mx-2">/</span>}
            <a href={`/f/${folder.id}`} className="text-blue-400 hover:underline">
              {index === 0 ? "My Drive" : folder.name}
          </a>
        </div>
        ))}
        </div>
        <div className="flex items-end justify-end">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> 
        </div>
      </nav>

      {/* Upload button */}
      {/* <div className="mb-4">
         <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div> */}

      {/* File list */}
      <div className="bg-gray-800 rounded-lg overflow-hiddeng gap-4">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 font-semibold">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Size</div>
          <div className="col-span-3">Last Modified</div>
        </div>
        <div className="mb-4">
        {FolderRow({folders: props.folders})}
        {FileRow({files: props.files})}
        </div>
      </div>
      <UploadButton endpoint="imageUploader" onClientUploadComplete={()=> {
        navigate.refresh()
      }}/>
    </div>
  )
}


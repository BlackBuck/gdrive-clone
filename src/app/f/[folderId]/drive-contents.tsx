"use client"

import { useEffect, useState } from "react"
import { folders_table, files_table } from "~/server/db/schema"
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs"
import { FileRow, FolderRow } from "./file-row"
// import Link from "next/link"
import { UploadButton } from "~/components/ui/uploadthing"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Form } from "~/components/ui/createFolder"
import { MUTATIONS } from "~/server/db/queries"
import { auth } from "@clerk/nextjs/server"

export default function DriveContents(props: {
    files: typeof files_table.$inferSelect[]
    folders: typeof folders_table.$inferSelect[]
    parents: typeof folders_table.$inferSelect[]
    currentFolderId: number
}) {
  const [isSelectingForm, setIsSelectingForm] = useState(false);
  const [breadcrumbs, setBreadCrumbs] = useState<typeof folders_table.$inferSelect[]>(props.parents.reverse());

  useEffect(()=> {
    setBreadCrumbs(breadcrumbs)
  }, [breadcrumbs]);
  const navigate = useRouter();
  

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="flex min-w-full flex-row justify-between align-middle">
        <h1 className="mb-8 text-3xl font-bold">JAM Drive</h1>
        <div className="mb-8 flex items-end justify-end">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Breadcrumb navigation */}
      <div className="min-w-screen flex flex-row justify-between pl-4 pr-8 align-middle">
        <nav className="grid grid-cols-2">
          <div className="flex items-start">
            {breadcrumbs.map((folder, index) => (
              <div key={`${folder.id}`} className="flex items-start">
                {index > 0 && <span className="mx-2">{">"}</span>}
                <a
                  href={`/f/${folder.id}`}
                  className="text-blue-400 hover:underline"
                >
                  {index === 0 ? "My Drive" : folder.name}
                </a>
              </div>
            ))}
          </div>
        </nav>
        <div className="grid grid-cols-2 gap-2">
          <Button className="items-end justify-center bg-blue-600 text-white hover:bg-blue-600 text-center" onClick={()=> {
            setIsSelectingForm(true)
            
          }}>
            Create Folder
          </Button>
          <UploadButton
            appearance={{
              allowedContent: "invisible",
              button:
                "items-end bg-blue-600 hover:bg-blue-600 text-white justify-center text-center",
            }}
            input={{ folderId: props.currentFolderId }}
            endpoint="fileUploader"
            onClientUploadComplete={() => {
              navigate.refresh();
            }}
          />
        </div>
      </div>

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
      <div className="overflow-hiddeng gap-4 rounded-lg bg-gray-800">
        <div className="grid grid-cols-12 gap-4 border-b border-gray-700 p-4 font-semibold">
          <div className="col-span-5">Name</div>
          <div className="col-span-3">Size</div>
          <div className="col-span-3">Last Modified</div>
        </div>
        <div className="mb-4">
          {FolderRow({ folders: props.folders })}
          {FileRow({ files: props.files })}
        </div>
        <div className={isSelectingForm ? "" : "invisible"}>
        </div>
      </div>
      <Form parent={props.currentFolderId} isModalOpen={isSelectingForm} setIsModalOpen={setIsSelectingForm} />

    </div>
  );
}


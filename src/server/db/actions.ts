"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from ".";
import { files_table } from "./schema";
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";

const utAPI = new UTApi();

export async function deleteFile(fileId: number) {
    const session = await auth();

    if(!session.userId) {
        return {error: "Unauthorized"}
    }

    const [file] = await db.select().from(files_table).where(and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)));

    if(!file) {
        return {error: "Error Deleting the File."}
    }

    const utAPIResult = await utAPI.deleteFiles([file.url.replace("https://utfs.io/f/", "")])
    console.log(utAPIResult)


    const dbDeleteResult = await db.delete(files_table).where(eq(files_table.id, fileId))
    console.log(dbDeleteResult)

    return {success: true};
}
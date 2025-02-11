"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from ".";
import { files_table } from "./schema";
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { MUTATIONS } from "./queries";

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

    const c = await cookies();
    c.set("force-refresh", JSON.stringify(Math.random())) // force refresh in a random interval between 0 and 1 second

    return {success: true};
}

export async function createFolder(folderName: string, parent: number, owner_id: string) {
    const session = await auth();

    if(!session.userId) {
        return {error: "Unauthorized"}
    }

    if(owner_id !== session.userId) {
        return {error: "Unauthorized"}
    }

    const folder = await MUTATIONS.createFolder({folder: {name: folderName, parent: parent, ownerId: owner_id}, userId: session.userId});

    if(!folder) {
        return {error: "Error creating a folder."}
    }

    
    const c = await cookies();
    c.set("force-refresh", JSON.stringify(Math.random())) // force refresh in a random interval between 0 and 1 second

    return {success: true};
}
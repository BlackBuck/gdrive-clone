import { db } from "~/server/db";
import { mockFolders } from "~/lib/mock-data";
import { folders_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";

export default function SandboxPage() {

    return (
        <div className="flex flex-col gap-4">
            Seed Function
            <form action={async ()=> {
                "use server";
                const user = await auth();

                if(!user.userId) throw new Error("User does not exist.");

                const rootFolder = await db.insert(folders_table).values({
                    name: "root",
                    parent: null,
                    ownerId: user.userId,
                }).$returningId();

                const insertableFolders = mockFolders.map((folder)=> {
                    return {
                        name: folder.name,
                        parent: rootFolder[0]!.id,
                        ownerId: user.userId,
                    }
                });

                await db.insert(folders_table).values(insertableFolders)
                
                }}>
               <button type="submit">Seed the database</button> 
            </form>
        </div>
    )
}
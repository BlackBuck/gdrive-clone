import "server-only";
import { eq } from "drizzle-orm";
import { files_table as filesSchema, folders_table as foldersSchema } from "./schema";
import { db } from ".";
import type { DB_FolderType, DB_FileType } from "./schema";
import { userAgent } from "next/server";

export const QUERIES = {
    getFiles: function (folderId: number) {
        return db.select().from(filesSchema).where(eq(filesSchema.parent, folderId));
    },
    
    getFolders: function (folderId: number) {
        return db.select().from(foldersSchema).where(eq(foldersSchema.parent, folderId));
    },
    
    getAllParents: async function (folderId: number) {
        const parents = []
        let currentId: number | null = folderId;
      
        while(currentId !== null) {
          const parent = await db.select().from(foldersSchema).where(eq(foldersSchema.id, currentId))
          if(!parent[0]) {
            throw new Error("Parent folder not found")
          } else {
            parents.unshift(parent[0]);
            currentId = parent[0].parent;
          }
        }
      
        return parents;
    }
}

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    },
    userId: string;
  }) {

    return await db.insert(filesSchema).values(input.file);
  }
}
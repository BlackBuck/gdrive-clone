import "server-only";
import { eq } from "drizzle-orm";
import { files_table, files_table as filesSchema, folders_table, folders_table as foldersSchema } from "./schema";
import { db } from ".";

export const QUERIES = {
    getFiles: function (folderId: number) {
        return db.select().from(filesSchema).where(eq(filesSchema.parent, folderId)).orderBy(filesSchema.id);
    },
    
    getFolders: function (folderId: number) {
        return db.select().from(foldersSchema).where(eq(foldersSchema.parent, folderId)).orderBy(foldersSchema.id);
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
    },

    getFolderById: async function (folderId: number) {
      const folders = await db.select().from(folders_table).where(eq(folders_table.id, folderId));

      return folders[0];
    }
}

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
      ownerId: string;
    },
    userId: string;
  }) {

    return await db.insert(files_table).values(input.file);
  }
}
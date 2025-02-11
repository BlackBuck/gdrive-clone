import "server-only";
import { and, eq, isNull } from "drizzle-orm";
import { files_table as filesSchema, folders_table as foldersSchema } from "./schema";
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
      const folders = await db.select().from(foldersSchema).where(eq(foldersSchema.id, folderId));

      return folders[0];
    },

    getRootFolderForUser: async function(userId: string) {
      const folder = await db.select().from(foldersSchema).where(and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)));

      return folder[0];
    }
}

export const MUTATIONS = {
  createFolder: async function(input: {
    folder: {
        name: string;
        parent: number;
        ownerId: string;
    },
    userId: string;
}) {
    if(input.folder.ownerId !== input.userId) {
      return null;
    }

    return await db.insert(foldersSchema).values(input.folder);
  },
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

    return await db.insert(filesSchema).values(input.file);
  },

  onboardUser: async function(userId: string) {
    const rootFolder = await db.insert(foldersSchema).values({
      name: "root",
      ownerId: userId,
      parent: null,
    }).$returningId();

    const rootFolderId = rootFolder[0]!.id;

    await db.insert(foldersSchema).values([
      {
        name: "Trash",
        ownerId: userId,
        parent: rootFolderId,
      },
      {
        name: "Shared",
        ownerId: userId,
        parent: rootFolderId,
      },
      {
        name: "Documents",
        ownerId: userId,
        parent: rootFolderId,
      }
    ])
  }
}
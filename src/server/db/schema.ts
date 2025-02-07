// import "server-only";

import { int, text, index, singlestoreTableCreator, bigint, timestamp } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive_clone_${name}`
)
export const files_table = createTable("files_table", {
  id: bigint("id", {mode: "number", unsigned: true}).notNull().primaryKey().autoincrement(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", {mode: "number", unsigned: true}).notNull(),
  ownerId: text("owner_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (tempTable) => {
  return [
    index("parent_index").on(tempTable.parent),
    index("owner_id_index").on(tempTable.ownerId)
  ]
});

export type DB_FileType = typeof files_table.$inferSelect

export const folders_table = createTable("folders_table", {
  id: bigint("id", {mode: "number", unsigned: true}).notNull().primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", {mode: "number", unsigned: true}),
  ownerId: text("owner_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
},
(t)=> {
  return [
    index("parent_index").on(t.parent),
    index("owner_id_index").on(t.ownerId)
  ]
});

export type DB_FolderType = typeof folders_table.$inferSelect

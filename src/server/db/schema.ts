import "server-only";

import { int, text, index, singlestoreTableCreator, bigint } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive_clone_${name}`
)
export const files = createTable("files_table", {
  id: bigint("id", {mode: "number", unsigned: true}).notNull().primaryKey().autoincrement(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", {mode: "number", unsigned: true}).notNull(),
}, (tempTable) => {
  return [
    index("parent_index").on(tempTable.parent)
  ]
});

export const folders = createTable("folders_table", {
  id: bigint("id", {mode: "number", unsigned: true}).notNull().primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: int("parent"),
});

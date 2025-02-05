import { files_table as filesSchema, folders_table as foldersSchema } from "~/server/db/schema"
import { db } from "~/server/db"
import DriveContents from "~/app/drive-contents";
import { eq } from "drizzle-orm";


const getAllParents = async (folderId: number)=> {
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
export default async function GoogleDriveClone(props: {
    params: Promise<{folderId: string}>
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if(isNaN(parsedFolderId)) {
      return <div>AN ERROR OCCURED</div>
  } else {
    const filesPromise = db.select().from(filesSchema).where(eq(filesSchema.parent, parsedFolderId));
    const foldersPromise = db.select().from(foldersSchema).where(eq(foldersSchema.parent, parsedFolderId));
    const parentsPromise = getAllParents(parsedFolderId);
    
    const [files, folders, parents] = await Promise.all([filesPromise, foldersPromise, parentsPromise]);

    return <DriveContents files={files} folders={folders} parents={parents}/>
  }

  
}

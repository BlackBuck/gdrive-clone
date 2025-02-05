import { getAllParents, getFiles, getFolders } from "~/server/db/queries";
import DriveContents from "~/app/drive-contents";

export default async function GoogleDriveClone(props: {
    params: Promise<{folderId: string}>
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if(isNaN(parsedFolderId)) {
      return <div>AN ERROR OCCURED</div>
  } else {
    const filesPromise = getFiles(parsedFolderId);
    const foldersPromise = getFolders(parsedFolderId)
    const parentsPromise = getAllParents(parsedFolderId);
    
    const [files, folders, parents] = await Promise.all([filesPromise, foldersPromise, parentsPromise]);

    return <DriveContents files={files} folders={folders} parents={parents}/>
  }
}

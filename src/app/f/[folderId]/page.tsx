import { QUERIES } from "~/server/db/queries";
import DriveContents from "~/app/drive-contents";

export default async function GoogleDriveClone(props: {
    params: Promise<{folderId: string}>
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if(isNaN(parsedFolderId)) {
      return <div>AN ERROR OCCURED</div>
  } else {
    const [files, folders, parents] = await Promise.all([
      QUERIES.getFiles(parsedFolderId), 
      QUERIES.getFolders(parsedFolderId),
      QUERIES.getAllParents(parsedFolderId),
    ]);

    return <DriveContents files={files} folders={folders} parents={parents}/>
  }
}

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createFolder } from '~/server/db/actions';
// import { MUTATIONS } from '~/server/db/queries'; // Adjust based on your database setup

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const folderName = formData.get("input");
        const parentIdRaw = formData.get("parent");

        if(typeof parentIdRaw !== 'string') {
            return NextResponse.json({ error: 'Invalid Parent Id' }, { status: 500 });
        }

        if(typeof folderName !== 'string') {
            return NextResponse.json({ error: 'Invalid folder name' }, { status: 500 });
        }

        const session = await auth();

        if(!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const parsedParentId = parseInt(parentIdRaw);
        const parsedFolderName = folderName.toString();
        await createFolder(folderName, parsedParentId, session.userId!);

        return NextResponse.redirect(new URL(`/f/${parsedParentId}`, req.url))
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
    }
}

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function Drive() {
    const session = await auth();

    if(!session.userId) {
       return redirect("/sign-in");
    } else {
        const rootFolder = await QUERIES.getRootFolderForUser(session?.userId);
        
            if(!rootFolder) {
               return <form action={async ()=> {
                "use server";

                if(!session.userId) {
                    return redirect("/sign-in")
                }

                await MUTATIONS.onboardUser(session.userId);
               }}>
                <Button size="lg"
              className="bg-white text-black hover:bg-neutral-200">Create New Drive</Button>
               </form>
            }
        
        return redirect(`/f/${rootFolder?.id}`);
    }   
}
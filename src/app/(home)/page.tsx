import { Button } from "~/components/ui/button"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function JAMDrive() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-900 text-white justify-between">
      <header className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold">JAM Drive</h1>
      </header>

      <main className="justify-center align-middle">
        <section className="bg-neutral-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Secure Cloud Storage for Everyone
            </h2>
            <p className="mb-8 text-xl text-neutral-300">
              Store, share, and collaborate on files with ease.
            </p>
            <form action={async()=> {
              "use server";
              const session = await auth();
              if(!session.userId) {
                return redirect('/sign-in')
              } 

              return redirect("/drive")
            }}>

            <Button
              type="submit"
              size="lg"
              className="bg-white text-black hover:bg-neutral-200"
            >
              Get Started
            </Button>
            </form>
          </div>
        </section>
{/* 
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="mb-12 text-center text-2xl font-semibold">
              Why Choose JAM Drive?
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<CloudIcon className="mb-4 h-10 w-10" />}
                title="Cloud-Based"
                description="Access your files from anywhere, on any device."
              />
              <FeatureCard
                icon={<LockIcon className="mb-4 h-10 w-10" />}
                title="Secure"
                description="Your data is encrypted and protected at all times."
              />
              <FeatureCard
                icon={<ShareIcon className="mb-4 h-10 w-10" />}
                title="Easy Sharing"
                description="Share files and folders with just a few clicks."
              />
              <FeatureCard
                icon={<ZapIcon className="mb-4 h-10 w-10" />}
                title="Fast"
                description="Lightning-fast uploads and downloads."
              />
            </div>
          </div>
        </section> */}
      </main>

      <footer className="bg-neutral-900 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-neutral-400">
          © 2023 JAM Drive. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard(props: {
  icon: React.ReactNode,
  title: string,
  description: string 
}) {
  return (
    <div className="bg-neutral-900 p-6 rounded-lg text-center">
      {props.icon}
      <h4 className="text-xl font-semibold mb-2">{props.title}</h4>
      <p className="text-neutral-400">{props.description}</p>
    </div>
  )
}


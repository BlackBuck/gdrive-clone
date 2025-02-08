import { Button } from "~/components/ui/button"
import { SignInButton } from "@clerk/nextjs";

export default function JAMDrive() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-neutral-900 text-white">
      <header className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold">JAM Drive</h1>
      </header>

      <main className="justify-center align-middle">
        <section className="bg-neutral-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-neutral-200"
            >
              <SignInButton forceRedirectUrl={"/drive"}/>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-900 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-neutral-400">
          © 2023 JAM Drive. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
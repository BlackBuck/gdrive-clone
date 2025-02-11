"use client";

import { useState } from "react"
import { useActionState } from "react"
import { Modal } from "./modal"
import { Button } from "./button"
import { MUTATIONS } from "~/server/db/queries"
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createFolder } from "~/server/db/actions";
import { auth } from "@clerk/nextjs/server";

export function Form(props: {isModalOpen: boolean, setIsModalOpen: Function, parent: number}) {
  const {isModalOpen, setIsModalOpen, parent} = props;
  const [isPending, setIsPending] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Folder">
        <form action="/api/folders" method="POST" className="space-y-4">
          <div className="">
            <Label htmlFor="input">Input</Label>
            <Input id="input" name="input" required />
            <Input name="parent" type="hidden" value={parent} />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Modal>
    </div>
  )
}


"use client";

import type { Dispatch, SetStateAction } from "react";
import { Modal } from "./modal"
import { Button } from "./button"
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";


export function Form(props: {isModalOpen: boolean, setIsModalOpen: Dispatch<SetStateAction<boolean>>, parent: number}) {
  const {isModalOpen, setIsModalOpen, parent} = props;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Folder">
        <form action="/api/folders" method="POST" className="space-y-4">
          <div className="">
            <Label htmlFor="input">Input</Label>
            <Input id="input" name="input" required />
            <Input name="parent" type="hidden" value={parent} />
          </div>
          <Button type="submit">
            {"Submit"}
          </Button>
        </form>
      </Modal>
    </div>
  )
}


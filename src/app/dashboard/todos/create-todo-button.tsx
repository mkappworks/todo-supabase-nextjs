"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { btnIconStyles, btnStyles } from "@/styles";
import { PlusCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import { CreateTodoForm } from "./create-todo-form";

export function CreateTodoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className={btnStyles}>
          <PlusCircleIcon className={btnIconStyles} />
          Create Todo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Todo</DialogTitle>
          <DialogDescription>
            Type what ever todo you want to search for later.
          </DialogDescription>
          <CreateTodoForm
            onCreate={() => {
              setIsOpen(false);
              toast.success("Todo created successfully", {
                duration: 5000,
              });
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteTodoAction } from "@/actions/todos";
import { LoadingButton } from "@/components/button/loading-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { btnIconStyles, btnStyles } from "@/styles";
import { Trash } from "lucide-react";

export function DeleteDocButton({ todoId }: { todoId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={btnStyles}>
          <Trash className={btnIconStyles} />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you want to delete this todo?</AlertDialogTitle>
          <AlertDialogDescription>
            Your todo cannot be recovered after been deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            onClick={() => {
              setIsLoading(true);
              deleteTodoAction({ id: todoId })
                .then(() => {
                  router.push("/dashboard/todos");
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }}
            isLoading={isLoading}
            loadingText="Deleting..."
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { createTodoAction } from "@/actions/todos";
import { LoadingButton } from "@/components/button/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTodoFormSchema } from "@/schemas/todos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export function CreateTodoForm({ onCreate }: { onCreate: () => void }) {
  const form = useForm<z.infer<typeof createTodoFormSchema>>({
    resolver: zodResolver(createTodoFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  async function onSubmit(values: z.infer<typeof createTodoFormSchema>) {
    const { errorMessage } = await createTodoAction(values);
    if (!errorMessage) {
      onCreate();
      toast.success("Todo created successfully", {
        duration: 5000,
      });
    } else {
      toast.error(errorMessage);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Please enter your a todo title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={8}
                  disabled={isSubmitting}
                  placeholder="Please enter your a todo description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={isSubmitting} loadingText="Creating...">
          Create
        </LoadingButton>
      </form>
    </Form>
  );
}

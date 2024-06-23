"use client";

import { useRouter } from "next/navigation";

import { createOrgAction } from "@/actions/orgs";
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
import { createOrgInputSchema } from "@/schemas/orgs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export function CreateOrgForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof createOrgInputSchema>>({
    resolver: zodResolver(createOrgInputSchema),
    defaultValues: {
      title: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  async function onSubmit(values: z.infer<typeof createOrgInputSchema>) {
    const [data, err] = await createOrgAction(values);

    if (err || !data || data?.data?.id === undefined) {
      toast.error("Error creating organisation");
    } else if (data?.errorMessage) {
      toast.error(data?.errorMessage);
    } else {
      router.replace(`/org/${data?.data.id}/dashboard/todos`);
      toast.success("Organisation created successfully", {
        duration: 5000,
      });
    }
  }

  return (
    <div className="relative flex w-full max-w-sm flex-col items-center rounded-lg border bg-popover p-8">
      <h1
        className={`mb-8 text-2xl font-semibold ${isSubmitting && "opacity-0"}`}
      >
        Create Organisation
      </h1>

      {isSubmitting && (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-2 text-primary">
          <p>Creating Organisation...</p>
          <Loader2 className="size-6 animate-spin" />
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`flex w-full flex-col gap-4 ${isSubmitting && "-z-10 opacity-0"}`}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Please enter your organisation title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            isLoading={isSubmitting}
            loadingText="Creating Organisation..."
          >
            Create Organisation
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}

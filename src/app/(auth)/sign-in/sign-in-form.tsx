"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { signInAction } from "@/actions/users";
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
import { signInFormSchema } from "@/schemas/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { errorMessage } = await signInAction(values);
    if (!errorMessage) {
      router.replace("/dashboard");
      toast.success("Successfully signed in");
    } else {
      toast.error(errorMessage);
    }
  }

  return (
    <div className="relative flex w-full max-w-sm flex-col items-center rounded-lg border bg-popover p-8">
      <h1
        className={`mb-8 text-2xl font-semibold ${isSubmitting && "opacity-0"}`}
      >
        Sign In
      </h1>

      {isSubmitting && (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-2 text-primary">
          <p>Signing in...</p>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isSubmitting}
                    placeholder="Please enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="password"
                    placeholder="Please enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton isLoading={isSubmitting} loadingText="Signin In...">
            Sign In
          </LoadingButton>

          <p className="mt-3 text-center text-xs">
            Don't have an account?
            <Link
              href="/create-account"
              className="ml-2 underline transition-colors duration-200 ease-in-out hover:text-primary"
            >
              Create Account
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createAccountAction } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function CreateAccountForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleClickCreateAccountButton = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await createAccountAction(formData);
      if (!errorMessage) {
        router.replace("/dashboard");
        toast.success("Account created successfully\nYou are now signed in", {
          duration: 5000,
        });
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="relative flex w-full max-w-sm flex-col items-center rounded-lg border bg-popover p-8">
      <h1 className={`mb-8 text-2xl font-semibold ${isPending && "opacity-0"}`}>
        Create Account
      </h1>

      {isPending && (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-2 text-primary">
          <p>Creating account...</p>
          <Loader2 className="size-6 animate-spin" />
        </div>
      )}

      <form
        className={`flex w-full flex-col gap-4 ${isPending && "-z-10 opacity-0"}`}
        action={handleClickCreateAccountButton}
      >
        <Input
          type="text"
          name="email"
          placeholder="Email"
          required
          disabled={isPending}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          disabled={isPending}
        />
        <Button disabled={isPending}>Create Account</Button>

        <p className="mt-3 text-center text-xs">
          Already have an account?
          <Link
            href="/sign-in"
            className="ml-2 underline transition-colors duration-200 ease-in-out hover:text-primary"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

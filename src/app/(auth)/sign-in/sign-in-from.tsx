"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signInAction } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function SignInForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleClickSignInButton = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await signInAction(formData);
      if (!errorMessage) {
        router.replace("/dashboard");
        toast.success("Successfully signed in");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="relative flex w-full max-w-sm flex-col items-center rounded-lg border bg-popover p-8">
      <h1 className={`mb-8 text-2xl font-semibold ${isPending && "opacity-0"}`}>
        Sign In
      </h1>

      {isPending && (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-2 text-primary">
          <p>Signing in...</p>
          <Loader2 className="size-6 animate-spin" />
        </div>
      )}

      <form
        className={`flex w-full flex-col gap-4 ${isPending && "-z-10 opacity-0"}`}
        action={handleClickSignInButton}
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
        <Button disabled={isPending}>Sign In</Button>

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
    </div>
  );
}

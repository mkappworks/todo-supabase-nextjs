import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth";

import { SignInForm } from "./sign-in-from";

export default async function SignInPage() {
  const user = await getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="flex min-h-screen items-center justify-center px-4 pb-24">
      <SignInForm />
    </main>
  );
}

"use client";

import { redirect } from "next/navigation";

export default function ErrorBoundary() {
  redirect("/dashboard/todos");
}

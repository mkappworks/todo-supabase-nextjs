import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(
  error: unknown,
  defaultMessage: string = "Something went wrong",
) {
  let errorMessage = defaultMessage;
  if (error instanceof Error && error.message.length > 100)
    errorMessage = error.message;

  return errorMessage;
}

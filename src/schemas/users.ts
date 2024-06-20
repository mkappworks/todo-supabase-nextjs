import { z } from "zod";

export const createAccountFormSchema = z.object({
  email: z.string().email("The email is invalid"),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long"),
});

export const signInFormSchema = z.object({
  email: z.string().email("The email is invalid"),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long"),
});

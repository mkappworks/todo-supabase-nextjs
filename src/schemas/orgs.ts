import { z } from "zod";

export const createOrgInputSchema = z.object({
  title: z.string().min(1, { message: "Organisation title is required" }),
});

export const createOrgOutputSchema = z.object({
  data: z
    .object({
      id: z.string(),
    })
    .optional(),

  errorMessage: z.string().nullable(),
});

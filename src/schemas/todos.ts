import { z } from "zod";

export const createTodoFormSchema = z.object({
  title: z
    .string()
    .min(1, "The title cannot be empty")
    .max(50, "The title cannot be more than 50 characters long"),
  description: z
    .string()
    .max(500, "The description cannot be more than 500 characters long")
    .optional(),
});

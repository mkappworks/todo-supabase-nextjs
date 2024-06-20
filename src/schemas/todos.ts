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

export const getTodoSchema = z.object({
  id: z.string().uuid("The todo id is required"),
});

export const updateTodoFormSchema = z.object({
  id: z.string().uuid("The todo id is required"),
  title: z
    .string()
    .min(1, "The title cannot be empty")
    .max(50, "The title cannot be more than 50 characters long"),
  description: z
    .string()
    .max(500, "The description cannot be more than 500 characters long")
    .optional(),
});

export const deleteTodoSchema = z.object({
  id: z.string().uuid("The todo id is required"),
});

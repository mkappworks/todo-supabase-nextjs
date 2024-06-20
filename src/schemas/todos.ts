import { z } from "zod";

export const createTodoInputSchema = z.object({
  title: z
    .string()
    .min(1, "The title cannot be empty")
    .max(50, "The title cannot be more than 50 characters long"),
  description: z
    .string()
    .max(500, "The description cannot be more than 500 characters long")
    .optional(),
});

export const createTodoOutputSchema = z.object({
  errorMessage: z.string().nullable(),
});

export const getTodosOutputSchema = z.object({
  data: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        createdAt: z.date(),
        updatedAt: z.date(),
        groupId: z.string(),
      }),
    )
    .optional(),
  errorMessage: z.string().nullable(),
});

export const getTodoInputSchema = z.object({
  id: z.string().uuid("The todo id is required"),
});

export const getTodoOutputSchema = z.object({
  data: z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
      groupId: z.string(),
    })
    .optional(),

  errorMessage: z.string().nullable(),
});

export const updateTodoInputSchema = z.object({
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

export const updateTodoOutputSchema = z.object({
  errorMessage: z.string().nullable(),
});

export const deleteTodoInputSchema = z.object({
  id: z.string().uuid("The todo id is required"),
});

export const deleteTodoOutputSchema = z.object({
  errorMessage: z.string().nullable(),
});

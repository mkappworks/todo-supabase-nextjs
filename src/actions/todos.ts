"use server";

import { revalidatePath } from "next/cache";

import db from "@/db";
import { todos } from "@/db/schemas/todos";
import {
  createTodoInputSchema,
  createTodoOutputSchema,
  deleteTodoInputSchema,
  deleteTodoOutputSchema,
  getTodoInputSchema,
  getTodoOutputSchema,
  getTodosOutputSchema,
  updateTodoInputSchema,
  updateTodoOutputSchema,
} from "@/schemas/todos";
import { and, desc, eq } from "drizzle-orm";

import { getErrorMessage } from "@/lib/utils";

import { authenticatedAction } from "./lib/safe-action";

export const createTodoAction = authenticatedAction
  .createServerAction()
  .input(createTodoInputSchema)
  .output(createTodoOutputSchema)
  .handler(async ({ ctx, input }) => {
    try {
      //TODO: Add groupId to the input
      await db.insert(todos).values({
        title: input.title,
        description: input.description,
        groupId: "groupId",
      });

      revalidatePath("/dashboard/todos");

      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  });

export const getTodosAction = authenticatedAction
  .createServerAction()
  .output(getTodosOutputSchema)
  .handler(async ({ ctx }) => {
    try {
      const todoList = await db
        .select()
        .from(todos)
        .where(eq(todos.groupId, ctx.user.id))
        .orderBy(desc(todos.updatedAt));

      return { data: todoList, errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  });

export const getTodoAction = authenticatedAction
  .createServerAction()
  .input(getTodoInputSchema)
  .output(getTodoOutputSchema)
  .handler(async ({ ctx, input }) => {
    try {
      const todo = await db.query.todos.findFirst({
        where: eq(todos.groupId, ctx.user.id) && eq(todos.id, input.id),
      });

      return { data: todo, errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  });

export const updateTodoAction = authenticatedAction
  .createServerAction()
  .input(updateTodoInputSchema)
  .output(updateTodoOutputSchema)
  .handler(async ({ ctx, input }) => {
    try {
      await db
        .update(todos)
        .set({
          title: input.title,
          description: input.description,
          updatedAt: new Date(),
        })
        .where(and(eq(todos.id, input.id), eq(todos.groupId, "groupId")));

      revalidatePath("/dashboard/todos");

      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  });

export const deleteTodoAction = authenticatedAction
  .createServerAction()
  .input(deleteTodoInputSchema)
  .output(deleteTodoOutputSchema)
  .handler(async ({ ctx, input }) => {
    try {
      await db
        .delete(todos)
        .where(and(eq(todos.id, input.id), eq(todos.groupId, "groupId")));

      revalidatePath("/dashboard/todos");

      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  });

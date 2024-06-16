"use server";

import { revalidatePath } from "next/cache";

import db from "@/db";
import { todos } from "@/db/schemas/todos";
import {
  createTodoFormSchema,
  deleteTodoSchema,
  updateTodoFormSchema,
} from "@/schemas/todos";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";

export const createTodoAction = async (
  values: z.infer<typeof createTodoFormSchema>,
) => {
  try {
    const { error, data } = createTodoFormSchema.safeParse(values);
    if (error) return { errorMessage: "The input data entered is not valid" };

    const user = await getUser();
    await db.insert(todos).values({
      title: data.title,
      description: data.description,
      userId: user.id,
    });

    revalidatePath("/dashboard/todos");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const getTodosAction = async () => {
  try {
    const user = await getUser();

    const todoList = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, user.id))
      .orderBy(desc(todos.updatedAt));

    return { data: todoList, errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const updateTodoAction = async (
  values: z.infer<typeof updateTodoFormSchema>,
) => {
  try {
    const { error, data } = updateTodoFormSchema.safeParse(values);
    if (error) return { errorMessage: "The input data entered is not valid" };

    const user = await getUser();

    await db
      .update(todos)
      .set({
        title: data.title,
        description: data.description,
        updatedAt: new Date(),
      })
      .where(and(eq(todos.id, data.id), eq(todos.userId, user.id)));

    revalidatePath("/dashboard/todos");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const deleteTodoAction = async (
  values: z.infer<typeof deleteTodoSchema>,
) => {
  try {
    const { error, data } = deleteTodoSchema.safeParse(values);
    if (error) return { errorMessage: "The input data entered is not valid" };

    const user = await getUser();

    await db
      .delete(todos)
      .where(and(eq(todos.id, data.id), eq(todos.userId, user.id)));

    revalidatePath("/dashboard/todos");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

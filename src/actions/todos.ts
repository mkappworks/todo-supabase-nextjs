"use server";

import db from "@/db";
import { todos } from "@/db/schemas/todos";
import { createTodoFormSchema } from "@/schemas/todos";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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

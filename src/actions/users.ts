"use server";

import { createAccountFormSchema, signInFormSchema } from "@/schemas/users";
import { z } from "zod";

import { getSupabaseAuth } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";

export const createAccountAction = async (
  values: z.infer<typeof createAccountFormSchema>,
) => {
  try {
    const { data: zodData, error: zodError } =
      signInFormSchema.safeParse(values);
    if (zodError)
      return { errorMessage: "The input data entered is not valid" };

    const email = zodData.email;
    const password = zodData.password;

    const { error } = await getSupabaseAuth().signUp({ email, password });

    if (error) throw error;

    const { data, error: signInError } =
      await getSupabaseAuth().signInWithPassword({ email, password });

    if (signInError) throw signInError;
    if (!data.session) throw new Error("No session found");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const signInAction = async (
  values: z.infer<typeof signInFormSchema>,
) => {
  try {
    const { data: zodData, error: zodError } =
      signInFormSchema.safeParse(values);
    if (zodError)
      return { errorMessage: "The input data entered is not valid" };

    const { data, error } = await getSupabaseAuth().signInWithPassword({
      email: zodData.email,
      password: zodData.password,
    });

    if (error) throw error;
    if (!data.session) throw new Error("No session found");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const signOutAction = async () => {
  try {
    const { error } = await getSupabaseAuth().signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

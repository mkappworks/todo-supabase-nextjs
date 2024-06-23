"use server";

import { revalidatePath } from "next/cache";

import db from "@/db";
import { organisations } from "@/db/schemas/organisations";
import { createOrgInputSchema, createOrgOutputSchema } from "@/schemas/orgs";

import { getErrorMessage } from "@/lib/utils";

import { authenticatedAction } from "./lib/safe-action";

export const createOrgAction = authenticatedAction
  .createServerAction()
  .input(createOrgInputSchema)
  .output(createOrgOutputSchema)
  .handler(async ({ ctx, input }) => {
    try {
      const newOrg = await db
        .insert(organisations)
        .values({
          title: input.title,
          organisationOwnerId: ctx.user.id,
        })
        .returning({ insertedId: organisations.id });

      const id = newOrg[0].insertedId;

      return { data: { id }, errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  });

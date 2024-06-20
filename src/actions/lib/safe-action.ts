import { createServerActionProcedure } from "zsa";

import { getUser } from "@/lib/auth";

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    const user = await getUser();

    //run a user based rate limit check
    // await rateLimitByKey(`${user.id}-global`, 10, 10000);

    return { user };
  },
);

export const unauthenticatedAction = createServerActionProcedure().handler(
  async () => {
    //run a global unauthenticated rate limit check
    // await rateLimitByKey("unauthenticated-global", 10, 10000);
  },
);

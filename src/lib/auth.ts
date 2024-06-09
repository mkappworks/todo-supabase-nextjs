import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const getUser = async () => {
  const auth = getSupabaseAuth();
  const user = (await auth.getUser()).data.user;
  if (!user) redirect("/sign-in");

  return user;
};

export function getSupabaseAuth() {
  const cookieStore = cookies();

  const superbaseClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
    },
  );

  return superbaseClient.auth;
}

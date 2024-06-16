import { NextResponse, type NextRequest } from "next/server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";

const publicRoutes = ["/sign-in", "/create-account", "/"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathName = request.nextUrl.pathname;

  const user = await getUser(request, response);

  const isPublicRoute = publicRoutes.includes(pathName);

  if (!user && !isPublicRoute)
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));

  if (
    user &&
    isPublicRoute &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  )
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

async function getUser(request: NextRequest, response: NextResponse) {
  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  const user = (await supabaseClient.auth.getUser()).data.user;

  return user;
}

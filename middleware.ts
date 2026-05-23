import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  const publicRoutes: string[] = [
    "/",
    "/sign-in",
    "/blog",
    "/service",
    "/about",
    "/contact",
    "/portfolio",
  ];

  const protectedRoutes: string[] = ["/write", "/dashboard", "/profile"];

  // Redirect logged-in users away from sign-in page
  if (token && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect unauthenticated users from protected routes
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api).*)"],
};

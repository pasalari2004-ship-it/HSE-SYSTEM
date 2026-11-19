import { auth } from "@/auth";
import { NextResponse } from "next/server";

const ROLE_HOME: Record<string, string> = {
  SUPER_ADMIN: "/super-admin",
  COMPANY_ADMIN: "/company-admin",
  HSE_MANAGER: "/dashboard",
  UNIT_MANAGER: "/dashboard",
};

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/personnel",
  "/accidents",
  "/news",
  "/super-admin",
  "/company-admin",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as any)?.role as string | undefined;

  // ۱. اگر کاربر لاگین کرده و می‌خواد بره /login یا / → بفرستش پنل خودش
  if (pathname === "/login" || pathname === "/") {
    if (isLoggedIn && role) {
      const home = ROLE_HOME[role] ?? "/dashboard";
      return NextResponse.redirect(new URL(home, req.nextUrl));
    }
    return NextResponse.next();
  }

  // ۲. اگه مسیر محافظت‌شده‌ست و کاربر لاگین نکرده → /login
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // ۳. اگه کاربر لاگین کرده ولی نقشش به این پنل دسترسی نداره
  if (isLoggedIn && role) {
    if (role === "SUPER_ADMIN" && pathname.startsWith("/company-admin")) {
      return NextResponse.redirect(new URL("/super-admin", req.nextUrl));
    }

    if (
      role === "COMPANY_ADMIN" &&
      (pathname.startsWith("/super-admin") || pathname.startsWith("/dashboard"))
    ) {
      return NextResponse.redirect(new URL("/company-admin", req.nextUrl));
    }

    if (
      (role === "HSE_MANAGER" || role === "UNIT_MANAGER") &&
      (pathname.startsWith("/super-admin") || pathname.startsWith("/company-admin"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/personnel/:path*",
    "/accidents/:path*",
    "/news/:path*",
    "/super-admin/:path*",
    "/company-admin/:path*",
    "/login",
  ],
};
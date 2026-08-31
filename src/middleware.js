import { NextResponse } from "next/server";

function decodeJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Read session cookie
  const sessionCookie = req.cookies.get("session")?.value;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    const payload = decodeJwt(sessionCookie);
    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect /user routes
  if (pathname.startsWith("/user")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    const payload = decodeJwt(sessionCookie);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"]
};
